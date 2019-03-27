import {
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';

export abstract class AbstractComponent implements OnInit, OnDestroy {

    protected destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }

    ngOnInit () {}
}
