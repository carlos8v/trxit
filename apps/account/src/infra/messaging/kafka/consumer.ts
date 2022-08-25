import { kafka } from './kafka'

export const consumer = kafka.consumer({
  groupId: 'account-group',
  allowAutoTopicCreation: true
})
