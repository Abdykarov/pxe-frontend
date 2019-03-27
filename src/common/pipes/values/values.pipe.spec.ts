import { ValuesPipe } from './values.pipe';


describe('ValuesPipe', () => {
    let pipe: ValuesPipe;
    const testObj = {
        jarda: 'coder',
        martin: 'developer',
        standa: 'developer',
        tomas: 'coder',
    };

    beforeEach(() => pipe = new ValuesPipe());

    it('create an instance', () => expect(pipe).toBeTruthy());

    it('get values from test object', () =>
        expect(pipe.transform(testObj)).toEqual(['coder', 'developer', 'developer', 'coder']));
});
