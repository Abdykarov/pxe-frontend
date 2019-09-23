const pattern = /^\d{5}$/;

export const isValidZipCode = (value) => pattern.exec(value);
