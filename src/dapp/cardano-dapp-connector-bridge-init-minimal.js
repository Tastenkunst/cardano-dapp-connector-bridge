initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.

  // In this callback you can do, whatever is necessary to setup a good connection, eg.
  // This is all optional! You could also just keep your normal "connect wallet" button,
  // but a better flow for the user would be an auto connect in this callback.

  // if(walletApi.name === 'eternl') {

    // Connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    // const fullApi = await walletApi.enable() // walletApi is window.cardano.eternl
  // }
})
