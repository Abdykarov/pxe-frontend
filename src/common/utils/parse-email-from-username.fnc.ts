export const parseEmailFromUsername = (username: string): string => {
    const atSignPosition = username.indexOf('@');
    const email = username
        .substring(0, atSignPosition < 0 ? username.length : atSignPosition)
        .replace('6_', '')
        .replace('__', '@');
    return email;
};
