import type { RequestHandler } from 'express'

export const token = 'user:routes'

export default class SignUp implements Route {
	readonly method = 'post'
	readonly path = '/sign-up'
	readonly pre: RequestHandler[] = []
	readonly post: RequestHandler[] = []
	readonly handler: RequestHandler = () => {}
}
