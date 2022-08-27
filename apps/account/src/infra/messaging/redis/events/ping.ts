import { Event } from '../bull'

const individualCreated: Event = {
  key: 'account.ping',
  options: { removeOnComplete: true }
}

export default individualCreated
