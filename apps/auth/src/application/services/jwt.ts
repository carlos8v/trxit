import jwt, { SignOptions } from 'jsonwebtoken'
import { jwtExpireTime } from '@cube/common'

const JWT_SECRET = process.env.JWT_SECRET!

const jwtOptions: SignOptions = {
  expiresIn: jwtExpireTime.formated
}

const sign = (payload: any) => jwt.sign(payload, JWT_SECRET, jwtOptions)
const verify = (accessToken: string) => jwt.verify(accessToken, JWT_SECRET)

export default {
  sign,
  verify
}
