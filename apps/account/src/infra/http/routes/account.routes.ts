import { Router } from 'express'
import { expressRouteAdapter } from '@trxit/common'

import { getCurrentAccountController } from '../controllers/getCurrentAccount'

const accountRouter = Router()

accountRouter.get('/', expressRouteAdapter(getCurrentAccountController))

export default accountRouter
