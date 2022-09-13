import { events } from '@trxit/common'

import { Event } from '../bull'

const individualCreated: Event = {
  key: events.individualCreated,
  options: { attempts: 3 }
}

export default individualCreated
