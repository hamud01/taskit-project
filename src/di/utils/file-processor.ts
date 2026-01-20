import { pathToFileURL } from 'node:url'
import type { InjectionToken } from 'tsyringe'

/**
 * Processes a file to extract dependency and token
 * @param filePath - Path to the file to process
 * @returns Object containing dependency and token
 */
export async function processFile(filePath: string): Promise<{
	dependency: unknown
	token: InjectionToken
}> {
	const module = await import(pathToFileURL(filePath).href)
	return {
		dependency: module.default,
		token: module.token,
	}
}
