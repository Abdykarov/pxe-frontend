import { AbstractComponent } from './abstract.component';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { CONSTS } from '../app/app.constants';
import { TypeOfResolution } from './models/type-of-resolution';

export abstract class AbstractResizeComponent extends AbstractComponent {
    public typeOfDevice = null;

    constructor() {
        super();
    }

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    public getTypeOfDevice = (): TypeOfResolution => {
        const viewPortWidth = window.innerWidth;
        if (viewPortWidth > CONSTS.XL_RESOLUTION) {
            return TypeOfResolution.DESKTOP;
        }

        if (viewPortWidth <= CONSTS.XL_RESOLUTION &&  viewPortWidth > CONSTS.SM_RESOLUTION ) {
            return TypeOfResolution.TABLET;
        }
        return  TypeOfResolution.MOBILE;
    }

}
