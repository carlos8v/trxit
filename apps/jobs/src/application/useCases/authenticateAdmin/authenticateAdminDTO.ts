import { Request, Response, NextFunction } from 'express'

export type AuthenticateAdminUseCase = (authSession: string) => void

export type AuthenticateAdminControllerFactory = { authenticateAdminUseCase: AuthenticateAdminUseCase }
export type AuthenticateAdminController = (req: Request, res: Response, next: NextFunction) => void
