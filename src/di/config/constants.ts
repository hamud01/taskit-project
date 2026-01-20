import path from 'node:path'

export const INJECTABLE_DEPENDENCIES = [
	'infrastructure',
	'use_cases',
	'repositories',
	'routes',
	'services',
]

export const rootDir = process.cwd()

/**
 * Gets the base directory for modules
 * @returns Base directory path
 */
export function getBaseDir(): string {
	return path.join(rootDir, 'src/modules')
}
