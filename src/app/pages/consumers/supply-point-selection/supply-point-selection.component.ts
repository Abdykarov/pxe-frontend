import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { getConfigStepper } from 'src/common/utils';
import { inArray } from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-point-selection',
    templateUrl: './supply-point-selection.component.html',
    styleUrls: ['./supply-point-selection.component.scss'],
})
export class SupplyPointSelectionComponent extends AbstractComponent implements OnInit {
    public loadingSupplyPoints = true;
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(ProgressStatus.SUPPLY_POINT);
    public supplyPoints: ISupplyPoint[] = null;

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus([
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map( ({data}) =>
                    data.findSupplyPointsByContractStatus
                        .filter(
                            (supplyPoint: ISupplyPoint) => inArray(AllowedOperations.SHOW_DELIVERY_TO, supplyPoint.allowedOperations),
                        ),
                    ),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.loadingSupplyPoints = false;
                    this.supplyPoints = supplyPoints;
                    this.cd.markForCheck();
                },
                error => {
                    this.supplyPoints = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public createSupplyPoint = () => {
        this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    }

    public navigateToSupplyPoint = (supplyPoint: ISupplyPoint) => {
        const state = {
            supplyPointCopy: {
                ...supplyPoint,
            },
        };
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT], {state});
    }
}
