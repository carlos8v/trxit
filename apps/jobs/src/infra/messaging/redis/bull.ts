import { QueueOptions, JobOptions } from 'bull'

import Redis, { Redis as RedisType, RedisOptions } from 'ioredis'
export let client: RedisType
export let subscriber: RedisType

export type Event = {
  key: string
  options?: JobOptions
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
