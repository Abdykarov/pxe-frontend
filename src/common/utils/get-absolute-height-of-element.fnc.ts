export const getAbsoluteHeightOfElementFnc = (el: any): number => {
    el = typeof el === 'string' ? document.querySelector(el) : el;

    const styles = window.getComputedStyle(el);
    const margin =
        parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

    return Math.ceil(el.offsetHeight + margin);
};
