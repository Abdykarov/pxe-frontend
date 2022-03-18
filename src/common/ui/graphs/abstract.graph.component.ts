import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
import { ABSTRACT_GRAPH_VALUES } from 'src/common/ui/graphs/abstract.graph.config';
import { IMargin } from 'src/common/ui/graphs/line-graph/models/line-graph.models';

@Directive()
export abstract class AbstractGraphComponent
    extends AbstractComponent
    implements OnInit
{
    public viewPortWidth = 0;

    @Input()
    public height = ABSTRACT_GRAPH_VALUES.HEIGHT;

    @Input()
    public margin: IMargin = ABSTRACT_GRAPH_VALUES.MARGIN;

    @Input()
    public reservedValueInYAxis =
        ABSTRACT_GRAPH_VALUES.RESERVED_VALUE_IN_Y_AXIS;

    @Input()
    public titleText: string;

    @Output()
    public mouseMove: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public mouseIn: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public mouseOut: EventEmitter<any> = new EventEmitter<any>();

    public width = ABSTRACT_GRAPH_VALUES.WIDTH;

    public resizeEvent$ = fromEvent(window, 'resize').pipe(
        takeUntil(this.destroy$),
        debounceTime(200)
    );

    ngOnInit() {
        this.resizeEvent$.subscribe(() => {
            this.viewPortWidth = Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
            );
            this.clearContent();
            this.initGraph();
        });
        this.initGraph();
    }

    protected abstract clearContent(): void;
    protected abstract initGraph(): void;
}
