export const appendStringToSpecPosition = (str: string, index: number, value: string) =>
    str.substr(0, index) + value + str.substr(index);
