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
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public supplyPointOffers: ISupplyPointOffer[];
    public supplyPoint: ISupplyPoint;

    constructor(
        private cd: ChangeDetectorRef,
        private contract: ContractService,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public globalError: string[] = [];

    ngOnInit () {
        this.supplyService.getSupplyPoint(parseInt(this.route.snapshot.paramMap.get('supplyPointId'), 10))
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(
                ({data}) => {
                    this.supplyPoint = data.getSupplyPoint;
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

    findSupplyPointOffers = (ean) => {
        this.offerService.findSupplyPointOffers(ean)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ({data}: any) => {
                    this.supplyPointOffers = data.findSupplyPointOffers;
                    R.map((supplyPointOffer: ISupplyPointOffer) => {
                        let benefits: string[] = [];

                        try {
                            benefits = supplyPointOffer.benefits && JSON.parse(<string>supplyPointOffer.benefits);
                        } catch (e) {}

                        supplyPointOffer.benefits = benefits;
                    } , this.supplyPointOffers);
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

    action = (supplyPointOffer: ISupplyPointOffer) => {
        const supplyPointId = this.supplyPoint.id;

        this.contract.saveContract(supplyPointOffer.id, supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ({data}: any) => {
                    const contractId = data.saveContract;
                    this.router.navigate([ROUTES.ROUTER_REQUEST_RECAPITULATION, {
                        supplyPointId,
                        contractId,
                    }]);
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
}
