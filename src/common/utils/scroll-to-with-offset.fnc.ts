import * as R_ from 'ramda-extension';
import { elementInViewport } from 'src/common/utils/element-in-viewport.fnc';

export const scrollToWithOffset = (
    el: Element | string,
    offsetY: number,
    applyOnlyIfElementIsInViewport = true
) => {
    const element: HTMLElement = R_.isString(el)
        ? document.querySelector(<string>el)
        : <HTMLElement>el;
    if (
        element &&
        (!applyOnlyIfElementIsInViewport || !elementInViewport(element))
    ) {
        const y =
            element.getBoundingClientRect().top + window.pageYOffset - offsetY;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};
