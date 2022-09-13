import jwt from 'jsonwebtoken'
import { jwtExpireTime } from '@trxit/common'

const JWT_PUBLIC = Buffer.from(process.env.JWT_PUBLIC_KEY!, 'base64')
const JWT_SECRET = Buffer.from(process.env.JWT_SECRET_KEY!, 'base64')

const jwtTokenExpires = jwtExpireTime.accessToken.formated
const jwtRefreshExpires = jwtExpireTime.refreshToken.formated

const audienceServices = [
  '@trxit/auth',
  '@trxit/account'
]

const sign = (payload: any, subject: string) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: jwtTokenExpires,
    algorithm: 'RS256',
    issuer: '@trxit/auth',
    audience: audienceServices,
    subject
  }
)

const signRefresh = (payload: any, subject: string) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: jwtRefreshExpires,
    algorithm: 'RS256',
    issuer: '@trxit/auth',
    audience: audienceServices,
    subject
  }
)

const verify = (accessToken: string) => jwt.verify(
  accessToken,
  JWT_PUBLIC,
  {
    algorithms: ['HS256'],
    issuer: '@trxit/auth'
  }
)

export default {
  sign,
  signRefresh,
  verify
}
