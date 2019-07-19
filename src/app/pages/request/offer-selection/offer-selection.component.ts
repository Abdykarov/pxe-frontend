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
import { interval } from 'rxjs';
import {
    filter,
    map,
    startWith,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { getConfigStepper } from 'src/common/utils';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ValidityService } from 'src/app/services/validity.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public loadingSupplyPointOffers = true;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(ProgressStatus.OFFER_STEP);
    public supplyPointOffers: ISupplyPointOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    public onlyOffersFromActualSupplier = false;
    public checkOfferSelectionConstraint$ = interval(CONSTS.REFRESH_INTERVAL_RXJS)
        .pipe(
            startWith(0),
            takeUntil(this.destroy$),
            filter(() => !this.onlyOffersFromActualSupplier),
        );

    public bannerObj: IBannerObj = {
        linkValue: 'basic/banners',
        // doplnit od monci
        text: 'Z důvodu, že Vaše nabídka končí  za méně než 31 dní jsou zobrazeny pouze nabídky od aktuálního dodavatele.',
    };

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        private validityService: ValidityService,
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
                    this.checkOfferSelectionConstraint$.subscribe(() => {
                        this.onlyOffersFromActualSupplier = this.validityService.validateOffer(this.supplyPoint);
                        if (!this.onlyOffersFromActualSupplier ) {
                            this.filterOffersOnlyActualSupplier();
                        }
                        this.cd.markForCheck();
                    });
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

    public filterOffersOnlyActualSupplier = () => {
        if (!R.isNil(this.supplyPointOffers) && R.isNil(this.supplyPoint)) {
            this.supplyPointOffers = R.filter((supplyPointOffers: ISupplyPointOffer) =>
                supplyPointOffers.supplier.id === this.supplyPoint.supplier.id)
            (this.supplyPointOffers);
        }
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
                    this.loadingSupplyPointOffers = false;
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
