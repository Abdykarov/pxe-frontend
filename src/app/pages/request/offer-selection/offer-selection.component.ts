import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './offer-selection.config';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public supplyPointOffers: ISupplyPointOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit () {
        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
            ).subscribe(
                (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.findSupplyPointOffers(this.supplyPoint.ean);
                },
                (error) => {
                    this.supplyPointOffers = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public findSupplyPointOffers = (ean) => {
        this.offerService.findSupplyPointOffers(ean)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.findSupplyPointOffers),
            )
            .subscribe(
                (findSupplyPointOffers: ISupplyPointOffer[]) => {
                    this.supplyPointOffers = findSupplyPointOffers;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.supplyPointOffers = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public saveContract = (supplyPointOffer: ISupplyPointOffer) => {
        const supplyPointId = this.supplyPoint.id;

        this.contractService.saveContract(supplyPointOffer.id, supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.saveContract),
            )
            .subscribe(
                () => {
                    this.router.navigate(
                        [ROUTES.ROUTER_REQUEST_RECAPITULATION],
                        {
                            queryParams: {
                                supplyPointId,
                            },
                        });
                },
                (error) => {
                    this.supplyPointOffers = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }
}
