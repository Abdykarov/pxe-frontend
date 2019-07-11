export const isPossibleIntegerFnc = (str) => {
    return /^\+?(0|[1-9]\d*)$/.test(str);
};
