export default class PriceBelowZeroException extends Error {
    constructor() {
        super('Price cannot be below zero.');
        this.name = 'PriceBelowZeroException';
    }
}   