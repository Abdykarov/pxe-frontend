import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-supply-point-overview',
    templateUrl: './supply-point-overview.component.html',
    styleUrls: ['./supply-point-overview.component.scss'],
})
export class SupplyPointOverviewComponent {
    @Input()
    public electricitySumOfPerformance;

    @Input()
    public electricityPlacesCount;

    @Input()
    public gasSumOfPerformance;

    @Input()
    public gasPlacesCount;

    @Input()
    public supplyPointsEnding: ISupplyPoint[] = [];

    @Output()
    public supplyPointsListAction: EventEmitter<any> = new EventEmitter();

    @Output()
    public newSupplierAction: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;

}
