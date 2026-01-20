import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

export const token = 'core:global-middlewares'

export default function () {
	return (origin: string, cookieSecret: string) => [
		json(),
		urlencoded({ extended: true }),
		cors({ origin, credentials: true }),
		helmet({ hidePoweredBy: true }),
		cookieParser(cookieSecret),
		morgan('dev'),
	]
}
