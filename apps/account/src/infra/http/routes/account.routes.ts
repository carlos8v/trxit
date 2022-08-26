import { Router } from 'express'
import { expressRouteAdapter } from '@cube/common'

import { getCurrentAccountController } from '@application/useCases/getCurrentAccount'

const accountRouter = Router()

accountRouter.get('/', expressRouteAdapter(getCurrentAccountController))

export default accountRouter
