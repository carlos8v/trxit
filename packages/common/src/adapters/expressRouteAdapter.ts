import { Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status'

import { IHttpHelper } from '../helpers/httpHelpers'

type ControllerFn = (req: Request) => Promise<IHttpHelper> | IHttpHelper

export default function (controller: ControllerFn) {
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
