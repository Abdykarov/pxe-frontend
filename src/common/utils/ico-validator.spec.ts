import { verifyIC } from './ico-validator.fnc';

describe('Ico validator', () => {

    it('27082440 should to be true', () => {
        expect(verifyIC([2, 7, 0, 8, 2, 4, 4, 0])).toEqual(true);
    });

    it('26168685 should to be true', () => {
        expect(verifyIC([2, 6, 1, 6, 8, 6, 8, 5])).toEqual(true);
    });

    it('25596641 should to be true', () => {
        expect(verifyIC([2, 5, 5, 9, 6, 6, 4, 1])).toEqual(true);
    });

    it('25596642 should to be false', () => {
        expect(verifyIC([2, 5, 5, 9, 6, 6, 4, 2])).toEqual(false);
    });
});
