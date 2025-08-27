export class ValidateError extends Error {
	public skip: boolean = false;
	public withoutNext: boolean = false;

	constructor(message?: string, withoutNext: boolean = true, skip: boolean = false) {
		if (message) message = '🚫 ' + message;
		super(message);
		this.skip = skip;
		this.withoutNext = withoutNext;
		Object.setPrototypeOf(this, ValidateError.prototype);
	}
}

export class FatalError extends Error {
	public skip: boolean = false;
	public withoutNext: boolean = false;

	constructor(message?: string | undefined | null, withoutNext: boolean = true, skip: boolean = false) {
		if (message) message = '🚫 ' + message;
		if (message === null) message = undefined;
		super(message);
		this.skip = skip;
		this.withoutNext = withoutNext;
		Object.setPrototypeOf(this, FatalError.prototype);
	}
}
