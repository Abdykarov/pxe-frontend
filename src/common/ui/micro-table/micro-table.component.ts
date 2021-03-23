import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { IMicroTableData } from './micro-table/item.model';

@Component({
    selector: 'lnd-micro-table',
    templateUrl: './micro-table.component.html',
    styleUrls: ['./micro-table.component.scss'],
})
export class MicroTableComponent {

    @Input()
    public data: IMicroTableData[];

    @Input()
    public actionTemplates: TemplateRef<any>;
}
