import { Request, Response } from 'express'

export type AdminData = {
  username: string
  password: string
}

export type SignInAdminUseCase = (adminData: AdminData) => string

export type SignInControllerFactory = { signInAdminUseCase: SignInAdminUseCase }
export type SignInAdminController = (req: Request, res: Response) => void
