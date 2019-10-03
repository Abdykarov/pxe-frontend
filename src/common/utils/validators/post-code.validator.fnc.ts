const pattern = /^\d{5}$/;

export const isValidPostCode = (value) => pattern.exec(value);
