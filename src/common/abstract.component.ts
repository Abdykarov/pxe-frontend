import {
    AfterViewInit,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

import { CONSTS } from 'src/app/app.constants';

export abstract class AbstractComponent implements OnInit, OnDestroy, AfterViewInit {
    public readonly CONSTS = CONSTS;
    protected destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }

    ngOnInit () {}

    ngAfterViewInit () {}

}
