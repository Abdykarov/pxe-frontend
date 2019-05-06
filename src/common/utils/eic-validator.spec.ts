import { EicValidator } from './eic-validator.fnc';

describe('EIC validator', () => {

    it('27zg700z0069625e should be true', () => {
        expect(EicValidator.validate( '27zg700z0069625e')).toEqual(true);
    });

    it('10X1001A1001A094 should be true', () => {
        expect(EicValidator.validate( '10X1001A1001A094')).toEqual(true);
    });

    it('10X1001A1001A39W should be true', () => {
        expect(EicValidator.validate( '10X1001A1001A39W')).toEqual(true);
    });

    it('10X1001A1001AW should be false', () => {
        expect(EicValidator.validate( '10X1001A1001AW')).toEqual(false);
    });

    it('10X1001A10013AW should be false', () => {
        expect(EicValidator.validate( '10X1001A10013AW')).toEqual(false);
    });

    it('10X1001A1001A39Wa should be false', () => {
        expect(EicValidator.validate( '10X1001A1001A39Wa')).toEqual(false);
    });


});
