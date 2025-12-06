/**
 * Pwa implementation
 * Registers service worker
 */
class Pwa {
    #serviceWorkerRegistration?: ServiceWorkerRegistration;

    constructor() {
        if (isSecureContext) {
            (async () => {
                this.#serviceWorkerRegistration = await navigator.serviceWorker.register("sw.js");
            })();
        }
    }
}

// Pwa export
export const pwa = new Pwa();