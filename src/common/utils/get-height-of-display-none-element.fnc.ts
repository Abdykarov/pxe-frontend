export const getHeightOfDisplayNoneElement = (el) => {
    const el_style = el.style,
        el_display = el_style.display,
        el_position = el_style.position,
        el_visibility = el_style.visibility,
        el_max_height = el_style.maxHeight.replace('px', '').replace('%', '');

    let wanted_height = 0;

    // if its not hidden we just return normal height
    if (el_display !== 'none' && el_max_height !== '0') {
        return el.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display = 'block';

    wanted_height = el.offsetHeight;

    // reverting to the original values
    el.style.display = el_display;
    el.style.position = el_position;
    el.style.visibility = el_visibility;

    return wanted_height;
};
