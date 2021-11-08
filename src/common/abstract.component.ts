import { AfterViewInit, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CONSTS, ROUTES } from 'src/app/app.constants';

@Directive()
export abstract class AbstractComponent
    implements OnInit, OnDestroy, AfterViewInit
{
    public readonly CONSTS = CONSTS;
    public readonly ROUTES = ROUTES;

    protected destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
    }

    ngOnInit() {}

    ngAfterViewInit() {}
}
