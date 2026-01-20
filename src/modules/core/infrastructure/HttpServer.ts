import http from 'node:http'
import express, { type RequestHandler } from 'express'
import { inject, injectable } from 'tsyringe'
import type BaseRouter from './BaseRouter'

@injectable()
export default class HttpServer {
	private readonly app = express()
	private readonly server = http.createServer(this.app)

	constructor(
		@inject('core:global-middlewares')
		private readonly globalMiddlewares: (
			origin: string,
			cookieSecret: string,
		) => RequestHandler[],

		@inject('router:base-router')
		private readonly baseRouter: BaseRouter,
	) {}

	run(config: ApplicationConfig['httpServer']) {
		this.app.use(...this.globalMiddlewares(config.origin, config.cookieSecret))
		this.app.use(this.baseRouter.router)
		this.server.listen(config.port, config.host)
	}

	close() {
		this.server.close()
		console.log('http server is closed')
	}
}
export const token = 'core:http-server'
