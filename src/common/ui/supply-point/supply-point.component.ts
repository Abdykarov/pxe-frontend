import {
    Component,
    Input,
} from '@angular/core';

import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})

export class SupplyPointComponent {
    @Input()
    public data: ISupplyPointFindData;
}
