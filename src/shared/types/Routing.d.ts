import type { RequestHandler } from 'express'

declare global {
	export enum HttpMetod {
		GET = 'get',
		POST = 'post',
		PUT = 'put',
		DELETE = 'delete',
		PATCH = 'patch',
	}

	export interface RouteInterceptos {
		pre: RequestHandler[]
		post: RequestHandler[]
	}

	export interface Route extends RouteInterceptos {
		method: HttpMetod
		path: string
		handler: RequestHandler
	}
}
