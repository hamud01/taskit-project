import fs from 'node:fs'
import path from 'node:path'

/**
 * Recursively gets all files from a directory
 * @param dir - Directory path to search
 * @param acc - Accumulator array for file paths
 * @returns Array of file paths
 */
export function getAllFiles(dir: string, acc: string[] = []): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true })
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name)
		if (entry.isDirectory()) {
			getAllFiles(fullPath, acc)
		} else {
			acc.push(fullPath)
		}
	}

	return acc
}
