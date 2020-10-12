export const countIndicator = (last: number, avg: number) => {
    return last / (avg / 100) - 100;
};
