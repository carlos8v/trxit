import { consumer } from './kafka/consumer'

import { events } from '@cube/common'

import { createAccountMessageAdapter } from '@application/useCases/createAccount'

const topicToMessageAdapter = {
  [events.individualCreated]: createAccountMessageAdapter
}

export const connectMessageBroker = async () => {
  try {
    consumer.connect()
    console.log('[@cube/account]: Kafka consumer connected')
  
    await consumer.subscribe({ topics: [events.individualCreated] })
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const messageJSON = message.value?.toString()
        if (!messageJSON) return
  
        if (!topicToMessageAdapter[topic]) return
        console.log(`[@cube/account]: Message received on topic "${topic}"`);
  
        try {
          await topicToMessageAdapter[topic](messageJSON)
        } catch (error) {
          console.error(error)
        }
      }
    })
  } catch (error) {
    console.log(error)
    console.error('Kafka consumer not initialized')
    process.exit(1)
  }
}

export const disconnectMessageBroker = async () => await consumer.disconnect()
