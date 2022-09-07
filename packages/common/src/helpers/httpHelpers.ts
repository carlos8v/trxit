import { Request } from 'express'

import {
  OK,
  CREATED,
  UNAUTHORIZED,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  FORBIDDEN,
  NOT_FOUND
} from 'http-status'

export type HttpHelper = {
  status: number
  error?: boolean
  data?: any
}

export type HttpController = (req: Request) => Promise<HttpHelper> | HttpHelper

export const ok = (data?: any): HttpHelper => ({
  status: OK,
  data
})

export const created = (data?: any): HttpHelper => ({
  status: CREATED,
  data
})

export const unauthorized = (data: any = null): HttpHelper => ({
  error: true,
  status: UNAUTHORIZED,
  data
})

export const forbidden = (data: any = null): HttpHelper => ({
  error: true,
  status: FORBIDDEN,
  data
})

export const badRequest = (data: any = null): HttpHelper => ({
  error: true,
  status: BAD_REQUEST,
  data
})

export const unprocessableEntity = (data: any = null): HttpHelper => ({
  error: true,
  status: UNPROCESSABLE_ENTITY,
  data
})

export const notFound = (data: any = null): HttpHelper => ({
  error: true,
  status: NOT_FOUND,
  data
})
