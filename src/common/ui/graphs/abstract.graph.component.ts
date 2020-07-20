import {
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { DEFAULT_GRAPH_VALUES } from 'src/common/ui/graphs/abstract.graph.config';
import { IMargin } from 'src/common/ui/graphs/line-graph/models/line-graph.models';

export abstract class AbstractGraphComponent extends AbstractComponent implements OnInit {

    @Input()
    public height = DEFAULT_GRAPH_VALUES.HEIGHT;

    @Input()
    public margin: IMargin = DEFAULT_GRAPH_VALUES.MARGIN;

    @Input()
    public reservedValueInYAxis = DEFAULT_GRAPH_VALUES.RESERVED_VALUE_IN_Y_AXIS;

    @Input()
    public titleText: string;

    @Output()
    public mouseMove: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public mouseOut: EventEmitter<any> = new EventEmitter<any>();

    public width = DEFAULT_GRAPH_VALUES.WIDTH;

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
