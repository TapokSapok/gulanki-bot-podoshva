export class ValidateError extends Error {
	public skip: boolean = false;

	constructor(message?: string, skip: boolean = false) {
		if (message) message = '🚫 ' + message;
		super(message);
		this.skip = skip;
		Object.setPrototypeOf(this, ValidateError.prototype);
	}
}

export class FatalError extends Error {
	public skip: boolean = false;

	constructor(message?: string | undefined | null, skip: boolean = false) {
		if (message) message = '🚫 ' + message;
		if (message === null) message = undefined;
		super(message);
		this.skip = skip;
		Object.setPrototypeOf(this, FatalError.prototype);
	}
}
