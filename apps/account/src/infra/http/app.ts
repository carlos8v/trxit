import express, { Request, Response } from 'express'

export const app = express()

app.get('/', (_req: Request, res: Response) => {
  return res.json({ ok: true })
})
