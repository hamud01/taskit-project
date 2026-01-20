import path from 'node:path'
import { getBaseDir, INJECTABLE_DEPENDENCIES } from './config/constants'
import { processFile } from './utils/file-processor'
import { getAllFiles } from './utils/file-scanner'
import { registerModule } from './utils/module-register'

export async function dependencyInjection() {
	try {
		const baseDir = getBaseDir()
		const files = getAllFiles(baseDir)

		for (const file of files) {
			const type = path.basename(path.dirname(file))
			if (!INJECTABLE_DEPENDENCIES.includes(type)) continue

			const { dependency, token } = await processFile(file)

			if (!token || !dependency) continue
			registerModule(dependency, token)
		}
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}
