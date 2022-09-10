import jwt from 'jsonwebtoken'
import { jwtExpireTime } from '@cube/common'

const JWT_SECRET = process.env.JWT_SECRET!

const jwtTokenExpires = jwtExpireTime.accessToken.formated

const sign = (payload: any) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: jwtTokenExpires,
    issuer: '@cube/jobs',
    audience: '@cube/jobs'
  }
)

const verify = (accessToken: string) => jwt.verify(
  accessToken,
  JWT_SECRET,
  {
    algorithms: ['HS256'],
    issuer: '@cube/jobs',
    audience: '@cube/jobs'
  }
)

export default {
  sign,
  verify
}
