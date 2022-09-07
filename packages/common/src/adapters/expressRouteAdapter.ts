import { Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'

import { HttpController } from '../helpers/httpHelpers'

export default function (controller: HttpController) {
  return async (req: Request, res: Response) => {
    try {
      const controllerResponse = await controller(req)

      if (controllerResponse?.error) {
        return res
          .status(controllerResponse.status || BAD_REQUEST)
          .json({
            status: controllerResponse.status,
            error: controllerResponse.data || 'Um erro inesperado ocorreu'
          })
      }

      return res.status(controllerResponse.status).json(controllerResponse.data)
    } catch (error) {
      console.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: 'Um erro inesperado ocorreu'
      })
    }
  }
}
