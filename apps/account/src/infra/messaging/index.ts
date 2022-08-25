import { consumer } from './kafka/consumer'

import { events } from '@cube/common'

import createAccountUseCase from '@application/useCases/createAccount'

export const connectMessaging = async () => {
  consumer.connect()
  console.log('[@cube/account] Kafka consumer connected')

  await consumer.subscribe({ topic: events.individualCreated })
  await consumer.run({
    eachMessage: async ({ message }) => {
      const individualJSON = message.value?.toString()
      if (!individualJSON) return

      try {
        createAccountUseCase(individualJSON)
      } catch (error) {
        console.log('Something went wrong')
      }
    }
  })
}
