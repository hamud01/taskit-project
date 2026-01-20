export const token = 'core:config'

const { NODE_ENV, PORT, MONGO_URI, HOST, ORIGIN, COOKIE_SECRET, JWT_SECRET } =
	process.env

function requireEnv(key: string, value?: string) {
	if (!value && isProduction)
		throw new Error(`Missing environment variable: ${key}`)
	return value
}

const isProduction = NODE_ENV === 'production'

const config: ApplicationConfig = {
	httpServer: {
		host: requireEnv('HOST', HOST) || 'localhost',
		port: Number(requireEnv('PORT', PORT) || 8000),
		cookieSecret: requireEnv('COOKIE_SECRET', COOKIE_SECRET) || 'secret',
		origin: requireEnv('ORIGIN', ORIGIN) || 'http://localhost:3000',
	},

	mongoDB: {
		uri:
			requireEnv('MONGO_URI', MONGO_URI) || 'mongodb://localhost:27017/taskit',
	},

	security: {
		jwtSecret: requireEnv('JWT_SECRET', JWT_SECRET) || 'secret',
	},
}

export default Object.freeze(config)
