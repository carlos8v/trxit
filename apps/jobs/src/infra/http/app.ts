import express from 'express'
import cookie from 'cookie-session'

import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'

import { queues } from '../messaging'

export const app = express()

app.set('trust proxy', true)
app.use(cookie({
  signed: false,
  maxAge: 1000 * 60 * 10
}))

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/')

createBullBoard({
  queues: queues.map((queue) => new BullAdapter(queue)),
  serverAdapter
})

app.use('/', serverAdapter.getRouter())
