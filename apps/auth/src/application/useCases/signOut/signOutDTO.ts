import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

export type SignOutController = (req: Request) => Promise<IHttpHelper>