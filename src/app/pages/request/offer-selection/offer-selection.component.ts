import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ContractService } from 'src/common/graphql/services/contract.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
} from 'src/common/utils';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { offerValidityMessages } from 'src/common/constants/errors.constant';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ValidityService } from 'src/app/services/validity.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public loadingSupplyPointOffers = true;
    public onlyOffersFromActualSupplier = false;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(ProgressStatus.OFFER_STEP);
    public supplyPointOffers: ISupplyPointOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    public bannerObj: IBannerObj = {
        text: '',
    };

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private navigateRequestService: NavigateRequestService,
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
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint)  => {
                    this.navigateRequestService.checkCorrectStep(supplyPoint, ProgressStatus.OFFER_STEP);
                    this.supplyPoint = supplyPoint;
                    this.setTextBannerByContractEndType();
                    this.onlyOffersFromActualSupplier = this.validityService.validateOffer(this.supplyPoint);
                    return this.offerService.findSupplyPointOffers(this.supplyPoint.ean);
                }),
                map(({data}) => data.findSupplyPointOffers),
                takeUntil(this.destroy$),
            ).subscribe(
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

    public setTextBannerByContractEndType = () => {
        if (this.validityService.validateOnlyDateExpiration(this.supplyPoint)) {
            this.bannerObj.text = offerValidityMessages.contractEndWithoutTerminate;
        }

        if (this.validityService.validateTermWithProlongation(this.supplyPoint)) {
            this.bannerObj.text = offerValidityMessages.contractEndWithTerminate;
        }
    }
}
