import jwt, { SignOptions } from 'jsonwebtoken'
import { jwtExpireTime } from '@cube/common'

const JWT_SECRET = process.env.JWT_SECRET!

const jwtTokenOptions: SignOptions = {
  expiresIn: jwtExpireTime.accessToken.formated
}

const jwtRefreshTokenOptions: SignOptions = {
  expiresIn: jwtExpireTime.refreshToken.formated
}

const sign = (payload: any, subject: string) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    ...jwtTokenOptions,
    subject
  }
)

const signRefresh = (payload: any, subject: string) => jwt.sign(
  payload,
  JWT_SECRET,
  {
    ...jwtRefreshTokenOptions,
    subject
  }
)

const verify = (accessToken: string) => jwt.verify(
  accessToken,
  JWT_SECRET,
  { algorithms: ['HS256'] }
)

export default {
  sign,
  signRefresh,
  verify
}
