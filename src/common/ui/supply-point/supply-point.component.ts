import {
    Component,
    EventEmitter,
    Input, OnInit,
    Output,
} from '@angular/core';

import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent {
    public allowedOperations = AllowedOperations;

    readonly UNIT_INDICATOR = 'MWh';

    @Input()
    public isListItem = false;

    @Input()
    public data: ISupplyPoint;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;

    constructor(
        private router: Router,
    ) {}

    public restoreContractAction(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        const state = {
            supplyPointCopy: {
                ...this.data,
            },
        };

        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
            {state});
    }
}

