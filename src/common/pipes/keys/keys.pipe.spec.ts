import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
    let pipe: KeysPipe;
    const testObj = {
        jarda: 'coder',
        martin: 'developer',
        standa: 'developer',
        tomas: 'coder',
    };

    beforeEach(() => pipe = new KeysPipe());

    it('create an instance', () => expect(pipe).toBeTruthy());

    it('get keys from test object', () =>
        expect(pipe.transform(testObj)).toEqual(['jarda', 'martin', 'standa', 'tomas']));
});
