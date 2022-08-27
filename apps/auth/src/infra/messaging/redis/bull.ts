import Bull from 'bull'
import { Queue, QueueOptions, JobOptions } from 'bull'

import events from './events'

import Redis, { Redis as RedisType, RedisOptions } from 'ioredis'
export let client: RedisType
export let subscriber: RedisType

export type Event = {
  key: string
  options?: JobOptions
}

export type EventList = {
  bull: Queue,
  name: string
  options: JobOptions
}

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
  enableReadyCheck: false
}

export const queueConfig: QueueOptions = {
  createClient: (type, redisOpts) => {
    switch (type) {
      case 'client':
        if (!client) client = new Redis({ ...redisOpts, ...redisOptions })
        return client;

      case 'subscriber':
        if (!subscriber) subscriber = new Redis({ ...redisOpts, ...redisOptions })
        return subscriber;

      case 'bclient':
        return new Redis({ ...redisOpts, ...redisOptions })

      default:
        throw new Error(`Unexpected connection type: ${type}`);
    }
  }
}

export const queues = events.map((event) => ({
  bull: new Bull(event.key, queueConfig),
  name: event.key,
  options: event?.options || {}
}))
