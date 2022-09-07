import jwt, { SignOptions } from 'jsonwebtoken'
import { jwtExpireTime } from '@cube/common'

const JWT_SECRET = process.env.JWT_SECRET!

const jwtOptions: SignOptions = {
  expiresIn: jwtExpireTime.accessToken.formated
}

const sign = (payload: any) => jwt.sign(
  payload,
  JWT_SECRET, {
    ...jwtOptions,
    audience: '@cube/jobs'
  }
)

const verify = (accessToken: string) => jwt.verify(
  accessToken,
  JWT_SECRET,
  {
    algorithms: ['HS256'],
    audience: '@cube/jobs'
  }
)

export default {
  sign,
  verify
}
