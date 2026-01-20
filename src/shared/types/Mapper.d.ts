declare global {
	interface Mapper<E, D> {
		toDomain(document: D): E
		toPersistence(entity: E): Partial<D>
	}
}
export {}
