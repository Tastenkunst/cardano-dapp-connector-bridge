# cardano-dapp-connector-bridge
A postMessage bridge to connect to dApps loaded into an iframe.

### Motivation
In April 2022, browser extensions are the only way to connect to Cardano dApps. The ecosystem lacks a dapp-connector
API on mobile devices and the web. This bridge script attempts to fill this gap.

With CIP-0030, Cardano already has a dapp-connector specification. Reusing this API will contribute to rapid adoption.

### How to: dApps
DApp includes cardano-dapp-connector-bridge.js and calls:

```js
// Calling this function is mandatory.
initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.
  // In this callback you can do, whatever is necessary to setup a good connection, eg.
  
  if(walletApi.name === 'eternl') {
    
    // Here you can set any global flags, eg. 
    // isIframeEmbedded = true
    // addWalletFee = true

    // You could also just connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    // const fullApi = await walletApi.enable() // walletApi is window.cardano.eternl
    
    // Eternl fee address (mainnet/testnet), see EternlDAppBrowser.md for more info.
    // const feeAddress = window.cardano.eternl.experimental.feeAddress // normal string, bech32 address.
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
      minor:                  7,
      patch:                  0
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
There are two options available.

1) Allow your page to be loaded in ANY web context (local, online, app, anywhere). This might be necessary to make third party services work correctly.
2) Restrict your page to be loaded only on certain domains.

Both options need to remove:
```
X-Frame-Options
```

For option 1 minimize response headers and remove any cross-origin or content-security-policy response headers.   

For option 2, to be able to load a dApp page into an iframe, ALL response headers must be configured correctly. This includes pages, images (CDNs) etc.

Add:
```
content-security-policy: frame-ancestors https://*.eternl.io/ https://eternl.io/ ionic: capacitor: chrome-extension: http://localhost:*/ https://localhost:*/;

cross-origin-embedder-policy: require-corp
cross-origin-opener-policy: same-origin
cross-origin-resource-policy: cross-origin
```

What frame-ancestors do?
```
https://*.eternl.io/ https://eternl.io/ -- page can be embedded on eternl pages.  
ionic: capacitor: chrome-extension: -- page can be embedded in apps.  
http://localhost:*/ https://localhost:*/ -- page can be embedded in development environments.  
```
