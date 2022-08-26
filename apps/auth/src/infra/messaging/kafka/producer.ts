import { kafka } from './kafka'

export const producer = kafka.producer({ allowAutoTopicCreation: true })
