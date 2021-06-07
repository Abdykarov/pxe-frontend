import unorm from 'unorm';

export const removeAccent = (text: string) => unorm.nfd(text).replace(/[\u0300-\u036f]/g, '');

