import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent {
    public allowedOperations = AllowedOperations;

    readonly UNIT_INDICATOR = 'MWh';

    @Input()
    public additionalInfoTemplate?: TemplateRef<any>;

    @Input()
    public isListItem = false;

    @Input()
    public data: ISupplyPoint;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;

    constructor() {}
}
