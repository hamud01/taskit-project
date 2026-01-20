import type { RequestHandler } from 'express'
import { container, injectable } from 'tsyringe'

export const token = 'user:routes'

@injectable()
export default class Heath implements Route {
	readonly method = 'get'
	readonly path = '/health'
	readonly pre: RequestHandler[] = []
	readonly post: RequestHandler[] = []
	readonly handler: RequestHandler = (_, res) => {
		res.json({ status: 'ok' })
	}
}
