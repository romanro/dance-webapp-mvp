import { expect } from 'chai';
import { } from 'mocha';
import { ValidationError } from 'express-validator';
import { ContextBuilder } from 'express-validator/src/context-builder';
import { contextsKey } from 'express-validator/src/base';
import { validate } from "../middleware/validation";


const allErrors: ValidationError[] = [
    { param: 'foo', msg: 'blabla', location: 'body', value: 123 },
    { param: 'foo', msg: 'watwat', location: 'body', value: 123 },
    { param: 'bar', msg: 'yay', location: 'query', value: 'qux' },
];

const makeContextsList = (errors: ValidationError[]) => {
    const context1 = new ContextBuilder().build();
    Object.defineProperty(context1, 'errors', {
        value: errors.slice(0, 1),
    });

    const context2 = new ContextBuilder().build();
    Object.defineProperty(context2, 'errors', {
        value: errors.slice(1),
    });

    return [context1, context2];
};


describe('validation middleware', () => {

    it('next() should be called if errors are empty', () => {
        const res: any = {
            status: function (code: number) {
                this.status = code;
                return this;
            },
            json: function (data: any) {
                this.success = data.success;
                this.errors = data.errors;
            },
        };
        let nextIsCalled = false;
        const req: any = { [contextsKey]: makeContextsList([]) };

        validate(req, res, () => { nextIsCalled = true });
        expect(nextIsCalled).to.be.equal(true);
    });

    it('returns 422 if errors are not empty', () => {
        const res: any = {
            status: function (code: number) {
                this.status = code;
                return this;
            },
            json: function (data: any) {
                this.success = data.success;
                this.errors = data.errors;
            },
        };
        const req: any = { [contextsKey]: makeContextsList(allErrors) };

        validate(req, res, () => { });
        expect(res.errors).to.not.be.empty;
        expect(res.success).to.be.equal(false);
        expect(res.status).to.be.equal(422);
    });

    it('returns all errors', () => {
        const res: any = {
            status: function (code: number) {
                this.status = code;
                return this;
            },
            json: function (data: any) {
                this.success = data.success;
                this.errors = data.errors;
            },
        };
        const req: any = { [contextsKey]: makeContextsList(allErrors) };

        validate(req, res, () => { });
        expect(res.errors).deep.equal(allErrors);
    });

});