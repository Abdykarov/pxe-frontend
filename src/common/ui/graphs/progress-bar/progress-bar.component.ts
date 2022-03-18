import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
import { Arc, DefaultArcObject } from 'd3';
import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';

@Component({
    selector: 'lnd-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent
    extends AbstractGraphComponent
    implements OnInit
{
    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

    @Input()
    public arcWidth = 12;

    @Input()
    public arcWidthOverride = 1;

    @Input()
    public cornerRadius = 5;

    @Input()
    public customClassLabel = '';

    @Input()
    public customClassOfMainCirce = '';

    @Input()
    public customClassOfProgressCirce = '';

    @Input()
    public percent;

    private readonly tau = 2 * Math.PI;

    public min: number;
    public svg: any;

    constructor(private hostElement: ElementRef) {
        super();
    }

    private arcTween =
        (newAngle: any, arcGenerator: Function) =>
        (d: Arc<any, DefaultArcObject>) => {
            const tau = 2 * Math.PI;
            const customInterpolate = d3.interpolate(d.endAngle, newAngle);
            return (t) => {
                d.endAngle = customInterpolate(t);
                return arcGenerator(d);
            };
        };

    private arcGenerator = (arcInnerRadius, arcOuterRadius, cornerRadius) =>
        d3
            .arc()
            .innerRadius(arcInnerRadius)
            .outerRadius(arcOuterRadius)
            .startAngle(0)
            .cornerRadius(cornerRadius);

    protected clearContent(): void {
        this.svgWrapper.nativeElement.innerHTML = '';
    }

    protected initGraph(): void {
        this.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
        const parentRect =
            this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width;
        this.min = Math.min(this.width, this.height);
        const that = this;

        this.svg = d3
            .select(this.svgWrapper.nativeElement)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.width)
            .on('mousemove', function () {
                that.mouseMove.emit(this);
            });

        const arcOuterRadius = this.min / 2;
        const arcInnerRadius = this.min / 2 - this.arcWidth;

        const g = this.svg
            .append('g')
            .attr('transform', `translate(${this.min / 2}, ${this.min / 2})`);

        g.append('path')
            .attr('class', `${this.customClassOfMainCirce}`)
            .attr(
                'd',
                this.arcGenerator(
                    arcInnerRadius,
                    arcOuterRadius,
                    this.cornerRadius
                )(<any>{ endAngle: this.tau })
            );

        g.append('path')
            .attr('class', `${this.customClassOfProgressCirce}`)
            .datum({ endAngle: (this.percent / 100) * this.tau })
            .transition(d3.transition().duration(0))
            .duration(0)
            .attrTween(
                'd',
                this.arcTween(
                    (this.percent * this.tau) / 100,
                    this.arcGenerator(
                        arcInnerRadius - this.arcWidthOverride,
                        arcOuterRadius + this.arcWidthOverride,
                        this.cornerRadius
                    )
                )
            );

        this.svg
            .append('text')
            .attr('class', `${this.customClassLabel}`)
            .attr('x', '50%')
            .attr('y', '50%')
            .attr('dominant-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .text(`${this.percent}%`);
    }
}
