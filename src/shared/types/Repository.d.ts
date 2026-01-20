declare global {
	interface Repository<T> {
		save(entity: T): Promise<T | null>
		delete(id: string): Promise<boolean>
		find(id: string): Promise<T | null>
		findAll(): Promise<T[]>
	}
}

export {}
