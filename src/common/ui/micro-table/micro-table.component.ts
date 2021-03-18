import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { IMicroTableData } from './micro-table/item.model';

@Component({
    selector: 'lnd-micro-table',
    templateUrl: './micro-table.component.html',
    styleUrls: ['./micro-table.component.scss'],
})
export class MicroTableComponent {
    @Input()
    public title: string;

    @Input()
    public data: IMicroTableData[];

    @Output()
    public updateAction: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public removeAction: EventEmitter<string> = new EventEmitter<string>();
}
