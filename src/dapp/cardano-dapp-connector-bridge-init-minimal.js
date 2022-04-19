// cardano-dapp-connector-bridge
//
// verison:                   v1.0.0
// date:                      19th April 2022
// author:                    Tastenkunst GmbH
// license:                   Apache License 2.0

initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.

  if(walletApi.name === 'eternl') {

    // Connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    const fullApi = await walletApi.enable() // walletApi is window.cardano.eternl
  }
})
