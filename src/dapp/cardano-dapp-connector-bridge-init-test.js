// cardano-dapp-connector-bridge
//
// verison:                   v1.0.0
// date:                      19th April 2022
// author:                    Tastenkunst GmbH
// license:                   Apache License 2.0

function addText(text) {

  var textnode                = document.createTextNode(text)
  var node                    = document.createElement('div')

  node.style.width            = '100%'
  node.appendChild(textnode)

  document.getElementById("list").appendChild(node)
}

addText('DApp: waiting.')

initCardanoDAppConnectorBridge(async (walletApi) => {

  // Bridge was established by the wallet.

  addText('DApp: initCardanoDAppConnectorBridge: bridge initialized.')

  console.log('walletApi', walletApi)

  if(walletApi.name === 'eternl') {

    // Connect through the dapp-connector as you would normally do via your connect wallet button.
    // eg.:

    var fullApi               = await walletApi.enable() // walletApi is window.cardano.eternl
    var changeAddr            = null
    var feeAddr               = walletApi.experimental?.feeAddress ?? null // address for Eternl DApp Browser

    addText('DApp: feeAddr: '+feeAddr)
    console.log('DApp: feeAddr:', feeAddr)

    if(fullApi) {

      try {

        // This code can be removed, it's here to check the api functions.
        await checkAPI(fullApi, 'getNetworkId',       false)
        await checkAPI(fullApi, 'getBalance',         false)
        await checkAPI(fullApi, 'getUsedAddresses',   false)
        await checkAPI(fullApi, 'getUnusedAddresses', false)
        await checkAPI(fullApi, 'getRewardAddresses', false)
        changeAddr = await checkAPI(fullApi, 'getChangeAddress', false); addText('DApp: changeAddr: ' + changeAddr)
        await checkAPI(fullApi, 'getUtxos',           false)
        await checkAPI(fullApi, 'getCollateral',      true)

      } catch(e) {

        addText('DApp: error: ' + JSON.stringify(e, null, 2))
        console.error(e)
      }

      try {

        if(fullApi && changeAddr) { await checkAPI(fullApi, 'signData', false, changeAddr, 'ffffffff') }

      } catch(e) {

        addText('DApp: error: signData: ' + JSON.stringify(e, null, 2))
        console.error(e)
      }

      try {

        if(fullApi && changeAddr) {

          var debugTx =
            await checkAPI(fullApi, 'signTx',         false, '',      false, true)
            await checkAPI(fullApi, 'signTx',         false, debugTx, false)
        }

      } catch(e) {

        addText('DApp: error: signTx: ' + JSON.stringify(e, null, 2))
        console.error(e)
      }
    }
  }
})

// This code can be removed, it's here to check the api functions.
async function checkAPI(fullApi, method, experimental) {

  addText('DApp: checkAPI: '+method+': send')

  var args = [...arguments]

  args.shift()
  args.shift()
  args.shift()

  addText('DApp: checkAPI: '+method+': send'+JSON.stringify(args, null, 2))
  console.log('DApp: checkAPI: '+method+': send', args)

  var res

  if(args.length > 0) {

    res = !experimental ? (await fullApi[method](...args)) : (await fullApi.experimental[method](...args))

  } else {

    res = !experimental ? (await fullApi[method]()) : (await fullApi.experimental[method]())
  }

  addText('DApp: checkAPI: '+method+': response: '+res)
  console.log('DApp: checkAPI: '+method+': response: ', res)

  return res
}
