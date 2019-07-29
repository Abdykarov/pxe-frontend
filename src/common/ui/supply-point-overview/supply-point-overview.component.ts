import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'pxe-supply-point-overview',
    templateUrl: './supply-point-overview.component.html',
    styleUrls: ['./supply-point-overview.component.scss'],
})
export class SupplyPointOverviewComponent {
    @Output()
    public supplyPointsListAction: EventEmitter<any> = new EventEmitter();

    @Output()
    public newSupplierAction: EventEmitter<any> = new EventEmitter();
}
