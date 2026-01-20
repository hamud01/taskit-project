import ValueObject from '#shared/domain/ValueObject'

export class HashPassword extends ValueObject {
	constructor(hash: string) {
		super('HashPassword', hash, {
			regExp: /^\$2[aby]\$(0[4-9]|[12][0-9]|3[01])\$[./A-Za-z0-9]{53}$/,
		})
	}
}
