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
    concatMap,
    map,
    takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { ContractService } from 'src/common/graphql/services/contract.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
} from 'src/common/utils';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.OFFER_STEP;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    public globalError: string[] = [];
    public loadingSupplyPointOffers = true;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public supplyPointOffers: ISupplyPointOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private navigateRequestService: NavigateRequestService,
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
                    this.navigateRequestService.checkCorrectStep(supplyPoint, ProgressStatus.OFFER_STEP);
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

        const contractAction = this.navigateRequestService.isPreviousStep(this.supplyPoint, this.ACTUAL_PROGRESS_STATUS) ?
            this.contractService.deleteSelectedOfferFromContract(this.supplyPoint.contract.contractId) : of({});

        contractAction
            .pipe(
                concatMap(() => this.contractService.saveContract(supplyPointOffer.id, supplyPointId)),
                map(({data}) => data.saveContract),
                takeUntil(this.destroy$),
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
