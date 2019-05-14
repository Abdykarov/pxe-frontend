import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'lnd-supply-points',
    templateUrl: './supply-points.component.html',
    styleUrls: ['./supply-points.component.scss'],
})
export class SupplyPointsComponent extends AbstractComponent implements OnInit {

    public supplierPoints: ISupplyPointFindData[];

    constructor(
        private supplyService: SupplyService,
        private cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();
        this.supplyService.findSupplyPoints('aaa')
            .pipe(
                takeUntil(this.destroy$),
                map( res => this.transportResponseToData(res)),
            ).subscribe((response: ISupplyPointFindData[]) => {
            this.supplierPoints = response;
            this.cd.markForCheck();
            // todo handle error? co kde jak?
        });
    }

    transportResponseToData = ({data}): ISupplyPointFindData[] => {
        return data.findSupplyPoints;
    }

}
