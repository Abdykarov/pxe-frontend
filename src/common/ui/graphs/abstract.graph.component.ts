import {
    EventEmitter,
    Input,
    OnInit, Output,
} from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { IMargin } from 'src/common/ui/graphs/line-graph/models/line-graph.models';

export abstract class AbstractGraphComponent extends AbstractComponent implements OnInit {

    @Input()
    public height = 400;

    @Input()
    public margin: IMargin = {
        top: 0,
        right: 60,
        bottom: 50,
        left: 50,
    };

    @Input()
    public reservedValueInXAxis = 8;

    @Input()
    public width = 900;

    @Input()
    public titleText: string;

    @Output()
    public mouseMove: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public mouseOut: EventEmitter<any> = new EventEmitter<any>();

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    ngOnInit() {
        this.resizeEvent$.subscribe(() => {
            this.clearContent();
            this.initGraph();
        });
        this.initGraph();
    }


    protected abstract clearContent(): void;
    protected abstract initGraph(): void;
}
