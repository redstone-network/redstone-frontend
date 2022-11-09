import { ApiPromise, WsProvider } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
// import dayjs from 'dayjs'
import { AccountType } from './enum'

// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:9944')
const api = await ApiPromise.create({ provider: wsProvider })

// Do something
async function getHex() {
  return api.genesisHash.toHex()
}

// getUser
function getUser(userName: string) {
  const keyring = new Keyring({ type: 'sr25519' })
  const user = keyring.addFromUri(`//${userName}`)
  return user
}
const Alice = getUser('Alice')
console.log(Alice)

async function getChainInfo() {
  // 1. 查看本条链的信息
  const [chain, nodeName, nodeVersion, metadata] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.state.getMetadata(),
  ])

  return {
    metadata,
    chain,
    nodeName,
    nodeVersion,
  }
}

// setMail
async function setMail(receiver: string, title: string, body: string) {
  return new Promise((resolve) => {
    api.tx.notification.setMail(receiver, title, body).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve({ events, status })
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}

// setDiscord
async function setSlack(hook_url: string, message: string) {
  return new Promise((resolve) => {
    api.tx.notification.setSlack(hook_url, message).signAndSend(Alice, ({ events = [], status }) => {
      console.log(222)
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// setDiscord
async function setDiscord(hook_url: string, user: string, content: string): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.notification.setDiscord(hook_url, user, content).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        console.log(status)
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// getInfo
async function getAccountInfo(index: AccountType) {
  const res = await api.query.notification.mapNofityAction(Alice.address, index)
  return res.toHuman()
}
// set amount limit
async function setAmountLimit(time: number, amount: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.defenseModule
      .setTransferLimit({ amountLimit: [time, amount] })
      .signAndSend(Alice, ({ events = [], status }) => {
        if (status.isFinalized) {
          resolve(true)
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
          })
        }
      })
  })
}
// set the timesLimit
async function setTimesLimit(time: number, amount: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.defenseModule
      .setTransferLimit({ timesLimit: [time, amount] })
      .signAndSend(Alice, ({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status)
          resolve(true)
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
          })
        }
      })
  })
}
// setFreezeTime
async function setFreezeTime(time: number, seconds: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.defenseModule
      .setRiskManagement({ timeFreeze: [time, seconds] })
      .signAndSend(Alice, ({ events = [], status }) => {
        if (status.isFinalized) {
          console.log(status)
          resolve(true)
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
          })
        }
      })
  })
}
// freeze
async function doFreeze(frozen: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.defenseModule.setRiskManagement({ accountFreeze: frozen }).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// createCaptureConfig
async function createCaptureConfig(list: string[], Threshold: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.permissionCapture.createCaptureConfig(list, Threshold).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// createGetAccountPermissions
async function createGetAccountPermissions(account: string): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.permissionCapture.createGetAccountPermissions(account).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// freeze
async function cancelGetAccountPermissions(account: string): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.permissionCapture.cancelGetAccountPermissions(account).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
// freeze
async function vote(proposal_id: number, Vote: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.permissionCapture.vote(proposal_id, Vote).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
async function operationalVoting(hash: number, Vote: number): Promise<boolean> {
  return new Promise((resolve) => {
    api.tx.permissionCapture.operationalVoting(hash, Vote).signAndSend(Alice, ({ events = [], status }) => {
      if (status.isFinalized) {
        resolve(true)
        events.forEach(({ phase, event: { data, method, section } }) => {
          console.log(`${phase.toString()} : ${section}.${method} ${data.toString()}`)
        })
      }
    })
  })
}
export {
  getHex,
  setMail,
  setSlack,
  setDiscord,
  getChainInfo,
  getAccountInfo,
  setAmountLimit,
  setTimesLimit,
  setFreezeTime,
  doFreeze,
  createCaptureConfig,
  createGetAccountPermissions,
  operationalVoting,
  vote,
  cancelGetAccountPermissions,
}
