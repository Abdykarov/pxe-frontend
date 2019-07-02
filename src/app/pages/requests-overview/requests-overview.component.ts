import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import * as R from 'ramda';
import { map, takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { ISupplyPoint, ProgressStatus } from 'src/common/graphql/models/supply.model';
import { OverviewState, OverviewStateWrapper } from './requests-overview.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-requests-overview',
    templateUrl: './requests-overview.component.html',
    styleUrls: ['./requests-overview.component.scss'],
})
export class RequestsOverviewComponent extends AbstractComponent implements OnInit {
    public readonly BANNER_IMAGE_SRC_OK = '/assets/images/illustrations/accepted.svg';

    public globalError: string[] = [];
    public supplyPoints: ISupplyPoint[];
    public state: OverviewState;
    public overviewStates = OverviewState;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus(null,
            [
                ContractStatus.NOT_CONCLUDED,
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map( ({data}) =>  data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.setOverviewState(supplyPoints);
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
        this.router.navigate(
            [this.getRouterForCompleteRequest(supplyPoint.progressStatus)],
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

    public isSomeContractEnding = (supplyPoints: ISupplyPoint[]): boolean => {
        return R.find((supplyPoint: ISupplyPoint) => {
            return this.contractEnding(supplyPoint);
        }, supplyPoints);
    }


    public contractEnding = (supplyPoint: ISupplyPoint) =>
        supplyPoint.contract
            && this.dateDiffPipe.transform(supplyPoint.contract.deliveryTo, moment().add(3 , 'month').toISOString()) < 3

    public isSomeRequest = (supplyPoints: ISupplyPoint[]): boolean => {
        return R.find((supplyPoint: ISupplyPoint) => {
            return this.isRequest(supplyPoint);
        }, supplyPoints);
    }

    public isRequest = (supplyPoint: ISupplyPoint): boolean =>
        supplyPoint.contract === null || (supplyPoint.contract && supplyPoint.contract.contractStatus !== ContractStatus.CONCLUDED)

    public setOverviewState = (supplyPointsInput: ISupplyPoint[]): void => {
        const overviewStateWrapper: OverviewStateWrapper = R.cond([
            [
                R.isEmpty,
                () => {
                    return {
                        overviewState: OverviewState.NO_REQUEST,
                        supplyPoints: [],
                    };
                },
            ],
            [
                this.isSomeRequest,
                (supplyPoints: ISupplyPoint[]) => {
                    return {
                        overviewState: OverviewState.REQUESTS,
                        supplyPoints: supplyPoints,
                    };
                },
            ],
            [
                this.isSomeContractEnding,
                (supplyPoints: ISupplyPoint[]) => {
                    return {
                        overviewState: OverviewState.SOME_SUPPLY_POINTS_ENDING_SUPPLY,
                        supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints),
                    };
                },
            ],
            [
                R.T(),
                (supplyPoints: ISupplyPoint[]) => {
                    return {
                        overviewState: OverviewState.ALL_SUPPLY_POINTS_HAVE_SUPPLY,
                        supplyPoints: supplyPoints,
                    };
                },
            ],
        ])(supplyPointsInput);

        this.state = overviewStateWrapper.overviewState;
        this.supplyPoints = overviewStateWrapper.supplyPoints;
    }

    public getRouterForCompleteRequest = (progressStatus: ProgressStatus): string => {
        switch (progressStatus) {
            case ProgressStatus.OFFER_STEP: {
                return ROUTES.ROUTER_REQUEST_OFFER_SELECTION;
            }
            case ProgressStatus.PERSONAL_DATA: {
                return ROUTES.ROUTER_REQUEST_RECAPITULATION;
            }
            case ProgressStatus.READY_FOR_SIGN: {
                return ROUTES.ROUTER_REQUEST_CONTRACT;
            }
            case ProgressStatus.WAITING_FOR_PAYMENT: {
                return ROUTES.ROUTER_REQUEST_PAYMENT;
            }
            default: {
                return ROUTES.ROUTER_REQUESTS;
            }
        }
    }

    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }
}
