import { MessagingAdapter } from '@application/adapters/MessagingAdapter'

import { queues } from '../bull'

export const redisMessagingAdapter: MessagingAdapter = {
  sendMessage: async (name, data) => {
    const queue = queues.find((queue) => queue.name === name)
    if (!queue) return

    await queue.bull.add(queue.name, data, queue.options)
  },
  process: async (name, handle) => {
    const queue = queues.find((queue) => queue.name === name)
    if (!queue) return

    queue.bull.on('failed', (job, err) => {
      console.log('Job failed', queue.name, job.data)
      console.log(err)
    })

    queue.bull.process(queue.name, async ({ data }, done) => {
      console.log(`[@trxit/account]: New "${queue.name}" event received`)
      try {
        const response = await handle(data)
        done(null, response || data)
      } catch (error: Error | any) {
        done(error, data)
      }
    })
  }
}
