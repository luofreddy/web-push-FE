/* eslint-disable no-restricted-globals */
// const page = 'https://ngrok.etrex.tw/backend_notification.html';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: './assets/images/android_048.png'
  };
  if (event.data) {
    options = event.data.json();
    title = options.title;
  }

  console.log(options);
  self.registration.showNotification(title, options)

  // event.waitUntil();
});

// self.addEventListener('notificationclick', function(event) {
//   if (event.action) {
//     console.log(`Action clicked: '${event.action}'`);
//   }else{
//     console.log('Notification Click.');
//   }

//   const promiseChain = clients.openWindow(page);
//   event.waitUntil(promiseChain);

// });

// self.addEventListener('notificationclose', function(event) {
//   console.log('Notification Close.');

//   const promiseChain = clients.openWindow(page);
//   event.waitUntil(promiseChain);
// });