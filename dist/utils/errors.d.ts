export declare class ValidateError extends Error {
    skip: boolean;
    withoutNext: boolean;
    constructor(message?: string, withoutNext?: boolean, skip?: boolean);
}
export declare class FatalError extends Error {
    skip: boolean;
    withoutNext: boolean;
    constructor(message?: string | undefined | null, withoutNext?: boolean, skip?: boolean);
}
