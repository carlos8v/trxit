import { Express } from 'express'

import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'

import { queues } from '../messaging'

import { proxyPath } from '@application/utils/proxyPath'

import { signInAdminController } from '@application/useCases/signInAdmin'
import { authenticateAdminController } from '@application/useCases/authenticateAdmin'

export const setupRoutes = (app: Express) => {
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath(`${proxyPath}/admin`)

  createBullBoard({
    queues: queues.map((queue) => new BullAdapter(queue)),
    serverAdapter
  })

  app.get('/admin/login', (req, res) => res.render('login', {
    invalid: req.query.invalid === 'true',
    proxyPath
  }))

  app.post('/admin/login', signInAdminController)
  app.use('/admin', authenticateAdminController, serverAdapter.getRouter())
}
