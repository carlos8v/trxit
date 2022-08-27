import { Event } from '../bull'

const individualCreated: Event = {
  key: 'auth.ping',
  options: { removeOnComplete: true }
}

export default individualCreated
