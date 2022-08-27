import { Request, Response, NextFunction } from 'express'

export const proxyPath = `${(process.env.PROXY_PATH || '/').replace(/\/$/g, '')}`

export default (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.session?.admin || {}
  if (!username || !password) return res.redirect(`${proxyPath}/admin/login?invalid=true`)

  if (
    username !== process.env.DASHBOARD_USER ||
    password !== process.env.DASHBOARD_PASS
  ) {
    return res.redirect(`${proxyPath}/admin/login?invalid=true`)
  }

  return next()
}
