# cardano-dapp-connector-bridge
A postMessage bridge to connect to dApps loaded into an iframe.

### Motivation
In April 2022, browser extensions are the only way to connect to Cardano dApps. The ecosystem lacks a dapp-connector
API on mobile devices and the web. This bridge script attempts to fill this gap.

With CIP-0030, Cardano already has a dapp-connector specification. Reusing this API will contribute to rapid adoption.

### How to: dApps
DApp includes cardano-dapp-connector-bridge.js and calls:

```js
initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.

  if(walletApi.name === 'eternl') {

    // Connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    const fullApi = await walletApi.enable() // walletApi is window.cardano.eternl
  }
})
```

### How to: wallets
Wallets need to provide their API object as usual, but replace all functions with a simple string:

```js
var bridgeInitialApi          = {

  isBridge:                   true,

  isEnabled:                  'isEnabled',
  enable:                     'enable',

  experimental: {             // your experimental object, if it exist

    appVersion: {

      major:                  1,
      minor:                  6,
      patch:                  2
    }
  },

  apiVersion:                 '0.1.0',
  name:                       'yourWalletNameSpace',
  icon:                       'data:image/png;base64,youricon',
}

var bridgeFullApi = {

  getNetworkId:               'getNetworkId',
  getUsedAddresses:           'getUsedAddresses',
  getUnusedAddresses:         'getUnusedAddresses',
  getRewardAddresses:         'getRewardAddresses',
  getChangeAddress:           'getChangeAddress',
  getBalance:                 'getBalance',
  getUtxos:                   'getUtxos',

  signTx:                     'signTx',
  signData:                   'signData',
  submitTx:                   'submitTx',

  getCollateral:              'getCollateral',

  experimental: {             // your experimental object, if it exist

    getCollateral:            'getCollateral'
  }
}
```
The API objects will be automatically recreated on the dApp side using postMessage calls.
See cardano-dapp-connector-bridge-init-wallet.js for more hints on how to implement it.

### Response headers
To be able to load a dApp page into an iframe, response headers must be configured correctly. This includes pages, images (CDNs) etc.
(also remove X-Frame-Options, if present):

Add:
```
content-security-policy: frame-ancestors https://staging.eternl.io/ https://eternl.io/ ionic: capacitor: chrome-extension: http://localhost:*/ https://localhost:*/;

cross-origin-embedder-policy: require-corp
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: cross-origin
```
Remove:
```
X-Frame-Options
```

https://staging.eternl.io/ https://eternl.io/ -- page loadable on eternl pages.
ionic: capacitor: chrome-extension: -- page loadable in apps.
http://localhost:*/ https://localhost:*/ -- page loadable in development environments.
