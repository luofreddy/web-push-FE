/* eslint-disable no-restricted-globals */
export class WebPushNotification {
  public setData:React.Dispatch<React.SetStateAction<"default" | "denied" | "granted">>
  
  constructor(setData:React.Dispatch<React.SetStateAction<"default" | "denied" | "granted">>){
    this.setData = setData;

    if(!('serviceWorker' in navigator)){
      return
    }

    if(!('PushManager' in window)){
      return
    }

    this.init();
  }
  
  async init(){
    const isReceiveNotification = await this.requestPermission();

    if(!isReceiveNotification){
      return
    }

    this.registerServiceWorker();
  }

  async requestPermission(){

    const currentPermission = Notification.permission;
    const permission = await Notification.requestPermission()
    this.setData(permission)

    if(permission !== 'granted'){
      console.warn('Permission not granted for Notification')
      return false
    }
    
    if(currentPermission !== permission){      
      new Notification('Permission granted for Notification', {body:'You will receive notifications'})
    }

    return true
  }

  /**
   *  base64 to Uint8Array
   *  source：https://hackmd.io/@wtflink515/HyjOvWtO_
   * @returns 
   */
   base64ToUint8Array(base64String:string) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async registerServiceWorker(){
    if(!process.env.REACT_APP_VAPID_PUBLIC_KEY){
      return
    }

    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: this.base64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY) // VAPID Public Key 為 base64 ， pushManager 需要 Uint8Array 格式
    };


    return navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then((pushSubscription) => {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      return pushSubscription;
    });
  }

}