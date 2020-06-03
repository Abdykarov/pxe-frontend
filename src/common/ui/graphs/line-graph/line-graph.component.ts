import {
    Component,
    ElementRef, Input,
    OnInit,
    ViewChild,
} from '@angular/core';

import * as d3 from 'd3';

@Component({
    selector: 'lnd-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {

    @ViewChild('canvasDiv', { static: true })
    public canvasDiv: ElementRef;

    ngOnInit() {
        this.initGraph();
    }

    private initGraph = () => {
        // const data = [  {'month': 10, 'sales': 20},
        //     {'month': 20, 'sales': 14},
        //     {'month': 30, 'sales': 20},
        //     {'month': 40, 'sales': 21},
        //     {'month': 50, 'sales': 15},
        //     {'month': 60, 'sales': 22},
        //     {'month': 70, 'sales': 9},
        //     {'month': 80, 'sales': 6},
        //     {'month': 90, 'sales': 23},
        //     {'month': 100, 'sales': 7},
        // ];
        //
        // const margin = {top: 10, right: 30, bottom: 30, left: 60},
        //     width = 460 - margin.left - margin.right,
        //     height = 400 - margin.top - margin.bottom;

       const svg = d3.select(this.canvasDiv.nativeElement)
            .append('span')
            .attr('width', 100)
            .attr('height', 100)
            .text('Hello, world!');


    }
}
