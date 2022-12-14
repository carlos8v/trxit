import { queues, client, subscriber } from './redis/bull'

import { events } from '@trxit/common'

import pingEvent from './redis/events/ping'
import { redisMessagingAdapter } from './redis/adapters/redisMessageAdapter'

import { createAccountUseCase } from '@application/useCases/createAccount'

const messageAdapterEvents = {
  [events.individualCreated]: createAccountUseCase
}

export const connectMessageBroker = async () => {
  try {
    redisMessagingAdapter.process(pingEvent.key, () => console.log('[@trxit/account]: Redis service connected'))
    await redisMessagingAdapter.sendMessage(pingEvent.key, { timestamps: Date.now() })

    Object.entries(messageAdapterEvents).forEach(([event, cb]) => {
      redisMessagingAdapter.process(event, cb)
    })

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
