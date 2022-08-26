import { Request } from 'express'
import { IHttpHelper } from '@cube/common'

import { AccountRepository } from '@application/repositories/accountRepository'

import { AccountModel } from '@domain/Account'

export type GetCurrentAccountUseCaseFactory = { accountRepository: AccountRepository }
export type GetCurrentAccountUseCase = (idPerson: string) => Promise<AccountModel>

export type GetCurrentAccountControllerFactory = { getCurrentAccountUseCase: GetCurrentAccountUseCase }
export type GetCurrentAccountController = (req: Request) => Promise<IHttpHelper>
