import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent extends AbstractComponent implements OnInit {

    constructor(
        private cd: ChangeDetectorRef,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.supplyService.getSupplyPointGlobalStatistics()
            .pipe(
                map(({data}) => data.getSupplyPointGlobalStatistics),
                takeUntil(this.destroy$),
            ).subscribe(
                (jidlo: any) => {
                    console.log(jidlo);
                },
                (error) => {
                },
            );


    }
}
