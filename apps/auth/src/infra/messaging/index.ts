import { queues, client, subscriber } from './redis/bull'

import pingEvent from './redis/events/ping'
import { redisMessagingAdapter } from './redis/adapters/redisMessageAdapter'

export const connectMessageBroker = async () => {
  try {
    redisMessagingAdapter.process(pingEvent.key, () => console.log('[@cube/auth]: Redis service connected'))
    await redisMessagingAdapter.sendMessage(pingEvent.key, { timestamps: Date.now() })
  } catch (error) {
    console.log(error)
    console.error('Redis service not initialized')
    process.exit(1)
  }
}

export const disconnectMessageBroker = async () => {
  for (const { bull } of queues) {
    await bull?.close()
  }

  client?.disconnect()
  subscriber?.disconnect()
}
