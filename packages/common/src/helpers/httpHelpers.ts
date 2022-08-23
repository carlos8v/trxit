import {
  OK,
  CREATED,
  UNAUTHORIZED,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  FORBIDDEN,
  NOT_FOUND
} from 'http-status'

export type IHttpHelper = {
  status: number
  error?: boolean
  data?: any
}

export const ok = (data?: any): IHttpHelper => ({
  status: OK,
  data
})

export const created = (data?: any): IHttpHelper => ({
  status: CREATED,
  data
})

export const unauthorized = (data: any = null): IHttpHelper => ({
  error: true,
  status: UNAUTHORIZED,
  data
})

export const forbidden = (data: any = null): IHttpHelper => ({
  error: true,
  status: FORBIDDEN,
  data
})

export const badRequest = (data: any = null): IHttpHelper => ({
  error: true,
  status: BAD_REQUEST,
  data
})

export const unprocessableEntity = (data: any = null): IHttpHelper => ({
  error: true,
  status: UNPROCESSABLE_ENTITY,
  data
})

export const notFound = (data: any = null): IHttpHelper => ({
  error: true,
  status: NOT_FOUND,
  data
})
