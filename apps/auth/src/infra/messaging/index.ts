import { producer } from './kafka/producer'

export const connectMessageBroker = async () => {
  try {
    await producer.connect()
    console.log('[@cube/auth]: Kafka producer connected')
  } catch (error) {
    console.log(error)
    console.error('Kafka producer not initialized')
    process.exit(1)
  }
}

export const disconnectMessageBroker = async () => producer.disconnect()
