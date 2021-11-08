import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    CommodityType,
    ISupplyPointStatisticView,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-supply-points-summary',
    templateUrl: './supply-points-summary.component.html',
    styleUrls: ['./supply-points-summary.component.scss'],
})
export class SupplyPointsSummaryComponent {
    @Input()
    public concludedPlacesCount = 0;

    @Input()
    public gasPlacesConsumptionSum = 0;

    @Input()
    public gasPlacesCount = 0;

    @Input()
    public notConcludedPlacesCount = 0;

    @Input()
    public powerPlacesConsumptionSum = 0;

    @Input()
    public powerPlacesCount = 0;

    @Input()
    public supplyPointsEndingCount = 0;

    @Output()
    public requestListAction: EventEmitter<any> = new EventEmitter();

    @Input()
    public supplyPointsEndingData: ISupplyPointStatisticView[];

    @Output()
    public supplyPointsListAction: EventEmitter<any> = new EventEmitter();

    @Output()
    public newSupplierAction: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;
}
