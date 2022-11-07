import { ApiPromise, WsProvider } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import dayjs from 'dayjs'

interface Res {
  events: any[]
  status: string
}

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
console.log(Alice.address)

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
      console.log(111)
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
        resolve({ events, status })
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
export { getHex, setMail, setSlack, setDiscord, getChainInfo }
