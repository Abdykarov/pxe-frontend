export const getHeightOfDisplayNoneElement = (
    el: HTMLDivElement,
    countSizeFor: HTMLDivElement = null,
    withLog = false
): number => {
    const el_style = window.getComputedStyle(el),
        el_display = el_style.display,
        el_position = el_style.position,
        el_visibility = el_style.visibility,
        el_max_height = el_style.maxHeight.replace('px', '').replace('%', '');

    let wanted_height = 0;

    const isDisplayInline = el.style.display;
    const isVisibilityInline = el.style.visibility;
    const isPositionInline = el.style.position;

    // if its not hidden we just return normal height
    if (el_display !== 'none' && el_max_height !== '0') {
        return countSizeFor?.offsetHeight || el.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display = 'block';

    wanted_height = countSizeFor?.offsetHeight || el.offsetHeight;

    if (!withLog) {
        // reverting to the original values
        el.style.display = isDisplayInline ? el_display : '';
        el.style.position = isPositionInline ? el_position : '';
        el.style.visibility = isVisibilityInline ? el_visibility : '';
    } else {
        el.style.visibility = null;
    }

    return wanted_height;
};
