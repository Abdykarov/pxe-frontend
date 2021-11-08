const phonePrefixes = [
    '2',
    '31',
    '32',
    '35',
    '37',
    '38',
    '39',
    '41',
    '46',
    '47',
    '48',
    '49',
    '51',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '95',
    '971',
    '972',
    '973',
    '974',
    '840114114',
    '972436321',
    '973315650',
    '975853100',
];
const mobilePrefixes = ['60', '70', '72', '73', '77', '79'];
const pattern = /^[0-9]{9}$/i;
const patternWithSpaces = /^[0-9]{3}[ ][0-9]{3}[ ][0-9]{3}$/i;

export const searchPrefixes = (prefixes, value) => {
    value = value.replace(/ /g, '');
    let j = Number.MAX_VALUE;
    for (let i = 0; i < prefixes.length; i++) {
        if (value.indexOf(prefixes[i]) === 0) {
            j = i;
            break;
        }
    }
    return j < prefixes.length && value.substring(0, 2) !== '20';
};

export const isValidLandlineNumber = (value) => {
    return (
        (pattern.test(value) || patternWithSpaces.test(value)) &&
        searchPrefixes(phonePrefixes, value)
    );
};

export const isValidMobilePhoneNumber = (value) => {
    return (
        (pattern.test(value) || patternWithSpaces.test(value)) &&
        searchPrefixes(mobilePrefixes, value)
    );
};

export const isValidTelephoneNumber = (value) => {
    return isValidMobilePhoneNumber(value) || isValidLandlineNumber(value);
};
