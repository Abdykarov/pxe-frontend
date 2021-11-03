import { AbstractComponent } from './abstract.component';
import { Directive } from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { CONSTS } from 'src/app/app.constants';
import { TypeOfResolution } from './models/type-of-resolution';

@Directive()
export abstract class AbstractResizeComponent extends AbstractComponent {
    public typeOfDevice = null;

    public showCarousel = true;

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
