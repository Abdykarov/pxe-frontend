export const removeHtmlFromText = (text: string): string => {
    if (document && document.createElement) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || div.innerText || '';
    } else {
        return '';
    }
};
