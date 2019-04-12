import * as R_ from 'ramda-extension';

export const scrollToElementFnc = (el: HTMLElement | string) => {
    const element: HTMLElement = R_.isString(el) ? document.getElementById(<string>el) : <HTMLElement>el;
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};
