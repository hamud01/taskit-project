declare global {
	export interface ApplicationConfig {
		httpServer: {
			host: string
			port: number
			cookieSecret: string
			origin: string
		}

		mongoDB: {
			uri: string
		}

		security: {
			jwtSecret: string
		}
	}
}

export {}
