import * as R_ from 'ramda-extension';

export const scrollToWithOffsetFnc = (el: Element | string, offsetY: number) => {
    const element: HTMLElement = R_.isString(el) ? document.querySelector(<string>el) : <HTMLElement>el;
    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - offsetY;
        window.scrollTo({top: y, behavior: 'smooth'});
    }
};
