export class NotAuthorizedError extends Error {
    constructor() {
        super('Not authorized');
    }
}
export class PermissionDeniedError extends Error {
    constructor() {
        super('Permission denied');
    }
}
export class InvalidOperationError extends Error {
    constructor(msg: string, code?: number) {
        super(msg);
    }
}