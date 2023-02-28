import './App.css';
import {useState, useRef, useEffect } from 'react';
import { WebPushNotification } from './notification';

function App() {
  const [name, setName] = useState<string>('');
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'default'>(Notification.permission);
  const webPushNotification = useRef<WebPushNotification|null>();

  const handleSubmit = () => {
    new Notification('前端發送通知', {
      body: `Hello ${name}`
    })
  }

  useEffect(() => {
    if (permissionState === 'granted') {      
      webPushNotification.current = new WebPushNotification(setPermissionState);
    }
  }, []);

  return (
   <form >
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <button type='button' onClick={handleSubmit}>submit</button>
      {permissionState === 'default' && <button type='button' onClick={()=>webPushNotification.current = new WebPushNotification(setPermissionState)}> Enable notification</button>}
      
   </form>
  );
}

export default App;
