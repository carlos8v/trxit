import { MessagingAdapter } from '@application/adapters/MessagingAdapter'
import { producer } from '../producer'

export const kafkaMessagingAdapter: MessagingAdapter = {
  async sendMessage(topic: string, message: any) {
    console.log(`[@cube/auth]: New message on topic "${topic}"`);

    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ]
    })
  }
}
