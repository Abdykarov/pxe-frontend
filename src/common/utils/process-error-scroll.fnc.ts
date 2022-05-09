import { CONSTS } from 'src/app/app.constants';
import { scrollToWithOffset } from 'src/common/utils/scroll-to-with-offset.fnc';

export const processErrorScrolls = () =>
    setTimeout(() => {
        const globalErrorDanger =
            document.getElementsByClassName('alert-danger') &&
            document.getElementsByClassName('alert-danger')[0];
        if (globalErrorDanger) {
            scrollToWithOffset(
                globalErrorDanger,
                CONSTS.OFFSET_ERRORS.ALERT_DANGER
            );
        } else {
            scrollToWithOffset(
                '.invalid-input',
                CONSTS.OFFSET_ERRORS.INVALID_INPUT
            );
        }
    });
