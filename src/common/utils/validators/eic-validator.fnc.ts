import * as R from 'ramda';

// http://e-group-ict.github.io/EICjs/eic.js

export class EicValidator {
    private static readonly charValues = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15,
        g: 16,
        h: 17,
        i: 18,
        j: 19,
        k: 20,
        l: 21,
        m: 22,
        n: 23,
        o: 24,
        p: 25,
        q: 26,
        r: 27,
        s: 28,
        t: 29,
        u: 30,
        v: 31,
        w: 32,
        x: 33,
        y: 34,
        z: 35,
        '-': 36,
    };

    private static valueChars = R.invert(EicValidator.charValues);

    private static mapping = (x) => EicValidator.charValues[x];

    private static weighting = (x, index) => (16 - index) * x;

    private static calcCheckChar = (str) => {
        const s = str.substring(0, 15).toLowerCase().split('');

        const c = R.sum(
            R.values(
                R.mapObjIndexed((x, i) => {
                    return EicValidator.weighting(x, i);
                }, R.map(EicValidator.mapping, s))
            )
        );

        return EicValidator.valueChars[36 - ((c - 1) % 37)][0];
    };

    public static validate = (str) => {
        if (str.length !== 16) {
            return false;
        }

        str = str.toLowerCase();
        for (let i = 0, len = str.length; i < len; ++i) {
            if (
                !(
                    (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) ||
                    (str.charCodeAt(i) >= 48 && str.charCodeAt(i) <= 57) ||
                    str[i] === '-'
                )
            ) {
                return false;
            }
        }

        const cc = EicValidator.calcCheckChar(str);

        return (
            !(str[15] !== cc || (str[15] === cc && cc === '-')) &&
            EicValidator.validateDistributionPositions(str.substr(4, 3))
        );
    };

    public static validateDistributionPositions = (str: string): boolean => {
        const allowValues = [100, 200, 300, 400, 500, 600, 700, 900];
        return allowValues.includes(Number(str));
    };
}
