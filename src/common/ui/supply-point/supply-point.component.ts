import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { CommodityType, ISupplyPointFindData } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent {

    readonly UNIT_INDICATOR = 'MWh';

    @Input()
    public isListItem = false;

    @Input()
    public data: ISupplyPointFindData;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;
}
