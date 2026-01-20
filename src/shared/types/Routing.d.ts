import type { RequestHandler } from 'express'

declare global {
	export interface RouteInterceptos {
		pre: RequestHandler[]
		post: RequestHandler[]
	}

	export interface Route extends RouteInterceptos {
		method: 'get' | 'post' | 'put' | 'delete' | 'patch'
		path: string
		handler: RequestHandler
	}
}
