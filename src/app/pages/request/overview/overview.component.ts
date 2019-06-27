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
import { ContractStatus } from 'src/common/graphql/models/contract';
import { getSupplyPointState } from 'src/common/utils/get-progress-stepper-config.fnc';
import {
    ISupplyPoint,
    SupplyPointState,
} from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public supplyPoints: ISupplyPoint[];

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus(null, [ContractStatus.NOT_CONCLUDED])
            .pipe(
                takeUntil(this.destroy$),
                map( ({data}) => data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
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

    public completeRequest = (supplyPoint: ISupplyPoint): void => {
        const supplyPointState: SupplyPointState = getSupplyPointState(supplyPoint);
        this.router.navigate(
            [this.getRouterForComplateRequest(supplyPointState)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
    }

    public newRequest = (evt): void => {
        evt.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }


    public getRouterForComplateRequest = (supplyPointState: SupplyPointState): string => {
        switch (supplyPointState) {
            case SupplyPointState.CHOOSE_OFFER: {
                return ROUTES.ROUTER_REQUEST_OFFER_SELECTION;
            }
            case SupplyPointState.PERSONAL_INFO: {
                return ROUTES.ROUTER_REQUEST_RECAPITULATION;
            }
            case SupplyPointState.CONTRACT: {
                return ROUTES.ROUTER_REQUEST_CONTRACT;
            }
            case SupplyPointState.PAYMENT: {
                return ROUTES.ROUTER_REQUEST_PAYMENT;
            }
            default: {
                return ROUTES.ROUTER_REQUEST;
            }
        }
    }
}
