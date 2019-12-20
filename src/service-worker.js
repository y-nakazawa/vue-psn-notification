addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  if (!(self.Notification && self.Notification.permission === 'granted'))
    return;

  let data = event.data ? event.data.json() : {};

  let title = data.title || "Web Push Notification";
  let message = data.message || "New Push Notification Received";
  let icon = "img/icons/notification-icon.jpg";
//    let badge = "img/icons/notification-icon.jpg";
  let options = {
    body: message,
    icon: icon,
//      badge: badge
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
  
addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click: ', event);
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://game.capcom.com/cfn/sfv/mylist')
  );
});

// Auto created by cli-plugin-pwa
//ーーーーーーーー
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// importScripts(
//   "/precache-manifest.2bd0c838904fae07e142e2a12fa583c5.js"
// );

workbox.core.setCacheNameDetails({prefix: "vue-pwa-psnlist"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
