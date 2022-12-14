import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'

import { HttpController } from '../helpers/httpHelpers'

export default function (middleware: HttpController) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const middlewareResponse = await middleware(req)

      if (middlewareResponse?.error) {
        return res
          .status(middlewareResponse.status || BAD_REQUEST)
          .json({
            status: middlewareResponse.status,
            error: middlewareResponse.data || 'Um erro inesperado ocorreu'
          })
      }

      return next()
    } catch (error) {
      console.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: 'Um erro inesperado ocorreu'
      })
    }
  }
}
