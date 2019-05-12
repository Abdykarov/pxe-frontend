import {
    Component,
    Input,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-overview-supply-points',
    templateUrl: './overview-supply-points.component.html',
    styleUrls: ['./overview-supply-points.component.scss'],
})
export class OverviewSupplyPointsComponent {
    @Input()
    public supplierPoints: ISupplyPointFindData[];
}
