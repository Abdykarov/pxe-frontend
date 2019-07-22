export const getTwoDecimalNumber = (number: number): string => {
    if (number < 10) {
        return `0${number}`;
    }

    return String(number);
};

export const convertDateToSendFormatFnc = (date: Date) =>
    `${date.getFullYear()}-${getTwoDecimalNumber(date.getUTCMonth() + 1)}-${getTwoDecimalNumber(date.getDate())}`;
