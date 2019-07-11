import {
    DICError,
    verifyDIC,
} from './dic-validator.fnc';

describe('DIC validator', () => {

    it('CZ27082440 should to be DICError.NONE', () => {
        expect(verifyDIC('CZ27082440')).toEqual(DICError.NONE);
    });

    it('SK27082440 should to be DICError.NONE', () => {
        expect(verifyDIC('SK27082440')).toEqual(DICError.NONE);
    });

    it('sk27082440 should to be DICError.PREFIX', () => {
        expect(verifyDIC('sk27082440')).toEqual(DICError.PREFIX);
    });

    it('SK2c082440 should to be DICError.DECIMAL', () => {
        expect(verifyDIC('SK2c082440')).toEqual(DICError.DECIMAL);
    });

    it('SK27082 40 should to be DICError.DECIMAL', () => {
        expect(verifyDIC('SK27082 40')).toEqual(DICError.DECIMAL);
    });
});
