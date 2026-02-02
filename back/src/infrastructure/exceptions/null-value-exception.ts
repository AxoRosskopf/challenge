export default class NullValueException extends Error {
    constructor() {
        super('Null value not allowed');
        this.name = 'NullValueException';
    }
}