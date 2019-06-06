export const verifyIC = (icArray: number[]): boolean => {
    if (icArray.length === 0) {
        return null;
    }

    let sum = 0;

    for (let i = 0; i < 7; i++) {
        sum += icArray[i] * (8 - i);
    }

    sum = sum % 11;

    let c: number;

    if (sum === 0) {
        c = 1;
    } else if (sum === 1) {
        c = 0;
    } else {
        c = 11 - sum;
    }

    return icArray[7] === c;
};

