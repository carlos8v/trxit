import { Express } from 'express'

import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'

import { queues } from '../messaging'

import adminAuthMiddleware, { proxyPath } from './adminAuthMiddleware'

export const setupRoutes = (app: Express) => {
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/')

  createBullBoard({
    queues: queues.map((queue) => new BullAdapter(queue)),
    serverAdapter
  })

  app.get('/admin/login', (req, res) => {
    res.render('login', { invalid: req.query.invalid === 'true' })
  })

  app.post('/admin/login', (req, res) => {
    const adminData = req.body

    if (!adminData || !adminData.username || !adminData.password) {
      return res.redirect(`${proxyPath}/admin/login?invalid=true`)
    }

    if (
      adminData.username !== process.env.DASHBOARD_USER ||
      adminData.password !== process.env.DASHBOARD_PASS
    ) {
      return res.redirect(`${proxyPath}/admin/login?invalid=true`)
    }

    req.session = { admin: adminData }

    return res.redirect(`${proxyPath}/admin`)
  })


  app.use('/admin', adminAuthMiddleware, serverAdapter.getRouter())
}
