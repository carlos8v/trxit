import jwt from 'jsonwebtoken'
import { jwtExpireTime } from '@trxit/common'

const JWT_SECRET = process.env.JWT_SECRET!

const jwtTokenExpires = jwtExpireTime.accessToken.formated

const sign = (payload: any) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: jwtTokenExpires,
    issuer: '@trxit/jobs',
    audience: '@trxit/jobs'
  }
)

const verify = (accessToken: string) => jwt.verify(
  accessToken,
  JWT_SECRET,
  {
    algorithms: ['HS256'],
    issuer: '@trxit/jobs',
    audience: '@trxit/jobs'
  }
)

export default {
  sign,
  verify
}
