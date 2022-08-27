import Bull, { Queue } from 'bull'

import events from './redis/events'
import { queueConfig, client, subscriber } from './redis/bull'

export const queues: Queue[] = events.map((event) => new Bull(event, queueConfig))

export const disconnect = async () => {
  for (const queue of queues) {
    await queue.close()
  }

  client?.disconnect()
  subscriber?.disconnect()
}
