import { EanValidator } from './ean-validator';

describe('EanValidator validator', () => {

    it('859182400813432086 should to be true', () => {
        expect(EanValidator.validate('859182400813432086')).toEqual(true);
    });

    it('859182400884676172 should to be false', () => {
        expect(EanValidator.validate( '859182400884676172')).toEqual(false);
    });
});
