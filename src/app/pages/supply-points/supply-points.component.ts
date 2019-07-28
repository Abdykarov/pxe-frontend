import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IsDatePast } from 'src/common/pipes/is-date-past/is-date-past.pipe';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'lnd-supply-points',
    templateUrl: './supply-points.component.html',
    styleUrls: ['./supply-points.component.scss'],
})
export class SupplyPointsComponent extends AbstractComponent implements OnInit {

    public allowedOperations = AllowedOperations;
    public dataLoading = true;
    public error = false;
    public errorMessages = [];
    public supplyPoints: ISupplyPoint[];
    public supplyPointsFuture: ISupplyPoint[];
    public supplyPointsActual: ISupplyPoint[];

    constructor(
        private cd: ChangeDetectorRef,
        private isDatePast: IsDatePast,
        private supplyService: SupplyService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();

        this.supplyService.findSupplyPointsByContractStatus(null, [
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map( ({data}) => data.findSupplyPointsByContractStatus),
            ).subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;
                    this.dataLoading = false;

                    this.supplyPointsActual =
                        R.filter(
                            (supplyPoint: ISupplyPoint) =>
                                moment()
                                    .isBetween(
                                        moment(supplyPoint.contract.deliveryFrom),
                                        moment(supplyPoint.contract.deliveryTo),
                                    ),
                        )(supplyPoints);

                    this.supplyPointsFuture =
                        R.filter(
                            (supplyPoint: ISupplyPoint) =>
                                this.isDatePast.transform(supplyPoint.contract.deliveryFrom),
                        )(supplyPoints);

                    this.cd.markForCheck();
                },
                (error) => {
                    this.dataLoading = false;
                    this.error = true;
                    const { globalError } = parseGraphQLErrors(error);
                    this.errorMessages = globalError;
                    this.cd.markForCheck();
                });
    }


    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }

    public navigateToSupplyPointDetail = ({id}: ISupplyPoint) => {
        this.router.navigate(
            [id],
            {
                relativeTo: this.route,
            },
        );
    }

    public restoreContractAction = (evt, supplyPoint: ISupplyPoint) => {
        evt.preventDefault();
        evt.cancelBubble = true;

        const state = {
            supplyPointCopy: {
                ...supplyPoint,
            },
        };

        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
            {state});
    }
}
