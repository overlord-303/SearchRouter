/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any[] };

import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

self.addEventListener('install', (ev) =>
{
    // noinspection JSIgnoredPromiseFromCall
    self.skipWaiting();
});

self.addEventListener('activate', (ev) =>
{
    ev.waitUntil((async () => {
        await self.clients.claim();
    })());
});

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
    new NavigationRoute(
        createHandlerBoundToURL('/index.html'),
        {
            denylist: [
                /^\/bangs(\/|$)/,
            ],
        }
    )
);
