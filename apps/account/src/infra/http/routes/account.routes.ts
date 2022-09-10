import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import { getCurrentAccountController } from '../controllers/getCurrentAccount'

const accountRouter = Router()

accountRouter.get('/', expressRouteAdapter(getCurrentAccountController))

export default accountRouter
