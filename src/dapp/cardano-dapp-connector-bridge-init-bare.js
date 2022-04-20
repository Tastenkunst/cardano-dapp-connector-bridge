initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.

  if(walletApi.name === 'eternl') {

    // Connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    const fullApi = await walletApi.enable() // walletApi is window.cardano.eternl

    if(fullApi) {

      // This code can be removed, it's here to check the api functions.
      await checkAPI(fullApi, 'getNetworkId',       false)
      await checkAPI(fullApi, 'getBalance',         false)
      await checkAPI(fullApi, 'getUsedAddresses',   false)
      await checkAPI(fullApi, 'getUnusedAddresses', false)
      await checkAPI(fullApi, 'getRewardAddresses', false)
      await checkAPI(fullApi, 'getChangeAddress',   false)
      await checkAPI(fullApi, 'getUtxos',           false)
      await checkAPI(fullApi, 'getCollateral',      true)

      const debugTx =
      await checkAPI(fullApi, 'signTx',             false, '',      false, true)
      await checkAPI(fullApi, 'signTx',             false, debugTx, false)
    }
  }
})

// This code can be removed, it's here to check the api functions.
async function checkAPI(fullApi, method, experimental) {

  const args = [...arguments]

  args.shift()
  args.shift()
  args.shift()

  console.log('DApp: checkAPI: '+method+': send', args)

  let res

  if(args.length > 0) {

    res = !experimental ? (await fullApi[method](...args)) : (await fullApi.experimental[method](...args))

  } else {

    res = !experimental ? (await fullApi[method]()) : (await fullApi.experimental[method]())
  }

  console.log('DApp: checkAPI: '+method+': response:', res)

  return res
}
