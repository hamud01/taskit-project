import { type RequestHandler, Router } from 'express'

export default abstract class RouterSlice implements RouteInterceptos {
	readonly basePath: string
	private readonly _router = Router()
	constructor(
		readonly name: string,
		readonly routes: Route[] = [],
		readonly pre: RequestHandler[] = [],
		readonly post: RequestHandler[] = [],
	) {
		this.basePath = `/${this.name}`

		this.addMiddlewares(pre).addRoutes(this.routes).addMiddlewares(post)
	}

	private addMiddlewares(middlewares: RequestHandler[] = []) {
		if (middlewares?.length) this._router.use(...middlewares)
		return this
	}

	private addRoutes(routes: Route[] = []) {
		if (routes?.length) {
			routes.forEach(({ path, method, handler, pre, post }) => {
				const handlers = [handler]

				if (pre?.length) handlers.unshift(...pre)
				if (post?.length) handlers.push(...post)
				this._router[method](path, ...handlers)
			})
		}

		return this
	}

	get router() {
		return this._router
	}
}
