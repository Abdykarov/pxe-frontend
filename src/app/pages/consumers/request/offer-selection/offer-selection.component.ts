import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';

import * as R from 'ramda';
import {
    interval,
    Observable,
    of,
} from 'rxjs';
import {
    filter,
    map,
    startWith,
    switchMap,
    takeUntil, tap,
} from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    GTM_CONSTS,
    ROUTES,
    S_ANALYTICS,
} from 'src/app/app.constants';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { FaqService } from 'src/app/services/faq.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
} from 'src/common/utils';
import { GTMService } from 'src/app/services/gtm.service';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import {
    IOffer,
    ISupplyPointImportPrices,
    ISupplyPointOffers,
} from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { offerValidityMessages } from 'src/common/constants/errors.constant';
import { removeAccent } from 'src/common/utils/standalone/remove-accent.fnc';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SupplyPointOfferComponent } from 'src/common/ui/supply-point-offer/supply-point-offer.component';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ValidityService } from 'src/app/services/validity.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractFaqComponent implements OnInit, OnDestroy {

    @ViewChildren('supplyPointOffers')
    public supplyPointOfferComponentChildren: QueryList<SupplyPointOfferComponent>;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        public faqService: FaqService,
        private gtmService: GTMService,
        public navigateRequestService: NavigateRequestService,
        private offerService: OfferService,
        public route: ActivatedRoute,
        private router: Router,
        public sAnalyticsService: SAnalyticsService,
        private supplyService: SupplyService,
        private validityService: ValidityService,
    ) {
        super(faqService, route);
        this.gtmService.loadFormEvent(GTM_CONSTS.LABELS.STEP_THREE, this.authService.hashedUserId);
    }

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.OFFER_STEP;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    public bannerObj: IBannerObj = {};
    public globalError: string[] = [];
    public loadingSupplyPointOffers = true;
    public offerSelected = false;
    public onlyOffersFromActualSupplier = false;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public supplyPointOffers: IOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;
    public existsCurrentOffer = false;

    public checkOfferSelectionConstraint$ = interval(CONSTS.INTERVAL_RXJS)
        .pipe(
            startWith(0),
            takeUntil(this.destroy$),
            filter(() => !this.onlyOffersFromActualSupplier),
        );

    private sortByTotalPriceAscend = R.sort(R.ascend(R.prop('totalPrice')));

    ngOnInit() {
        this.sAnalyticsService.installSForm();

        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                _ => this.cd.markForCheck(),
            );

        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                tap(console.log),
                switchMap(this.setCurrentStateAndFindSupplyPointOffers),
                tap(console.log),
                map(({data}) => data.findSupplyPointOffers),
                tap(console.log),
                map(this.addPastOfferToFindSupplyPointOffers),
                tap(console.log),
                map(this.sortByTotalPriceAscend),
                tap(console.log),
                map(this.ifCurrentIsTheBestRemoveIt),
                tap(console.log),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (findSupplyPointOffers: IOffer[]) => {
                    this.existsCurrentOffer = R.find(this.isCurrentOffer)(findSupplyPointOffers);
                    this.supplyPointOffers = findSupplyPointOffers;
                    this.loadingSupplyPointOffers = false;
                    this.setTextBannerByContractEndType();
                    this.checkOfferSelectionConstraint$.subscribe(() => {
                        this.onlyOffersFromActualSupplier = this.validityService.validateOffer(this.supplyPoint);
                        if (this.onlyOffersFromActualSupplier) {
                            this.filterOffersOnlyActualSupplier();
                        }
                        this.cd.markForCheck();
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

    public scrollToCurrentOffer = () => {
        const supplyPointOfferComponentCurrent = R.find(
            ({supplyPointOffer}) => this.isCurrentOffer(supplyPointOffer))
        (this.supplyPointOfferComponentChildren);
        const elementToScroll = supplyPointOfferComponentCurrent.supplyPointOfferWrapper.nativeElement;
        elementToScroll.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }

    private setCurrentStateAndFindSupplyPointOffers = (supplyPoint: ISupplyPoint): Observable<any> => {
        this.navigateRequestService.checkCorrectStep(supplyPoint, ProgressStatus.OFFER_STEP);
        this.supplyPoint = supplyPoint;
        return this.offerService.findSupplyPointOffers(this.supplyPoint.identificationNumber);
    }

    public filterOffersOnlyActualSupplier = (): void => {
        if (!R.isNil(this.supplyPointOffers) && !R.isNil(this.supplyPoint)) {
            this.supplyPointOffers = R.filter((supplyPointOffers: IOffer) =>
                supplyPointOffers.supplier.id === this.supplyPoint?.supplier?.id)
            (this.supplyPointOffers);
        }
    }

    private addPastOfferToFindSupplyPointOffers = (supplyPointOffers: ISupplyPointOffers): IOffer[] => {
        const pastOffer: IOffer = this.supplyPoint?.contract?.offer ||
            supplyPointOffers.pastOffer ||
            this.supplyPointImportPricesToOffer(this.supplyPoint, supplyPointOffers.supplyPointImportPrices);

        return R.pipe(
            R.append(pastOffer),
            R.reject(R.isNil),
        )(supplyPointOffers.offers);
    }

    private supplyPointImportPricesToOffer = (supplyPoint: ISupplyPoint, supplyPointImportPrices: ISupplyPointImportPrices): IOffer => {
        if (supplyPointImportPrices?.importPermanentMonthlyPay != null) {
            return {
                __typename: '',
                accountingRegulatedPrice: 0,
                annualConsumption: undefined,
                benefits: undefined,
                circuitBreaker: undefined,
                commodityType: '',
                consumptionPriceGas: 0,
                consumptionPriceNT: 0,
                consumptionPriceVT: 0,
                deliveryFrom: '',
                deliveryLength: 0,
                deliveryTo: '',
                distributionLocation: '',
                distributionPriceByCapacity: 0,
                distributionPriceByConsumptionGas: 0,
                distributionPriceByConsumptionNT: 0,
                distributionPriceByConsumptionVT: 0,
                distributionRate: undefined,
                energyTaxRegulatedPrice: 0,
                greenEnergy: false,
                id: '',
                isLastUpdated: false,
                isOwnOffer: false,
                marked: false,
                marketOrganizerRegulatedPrice: 0,
                monthlyConsumptionFee: 0,
                name: this.supplyPoint?.contract?.offer?.name,
                permanentPaymentPrice: 0,
                priceGas: 0,
                priceGasWithVAT: 0,
                priceNT: 0,
                priceNTWithVAT: 0,
                priceVT: 0,
                priceVTWithVAT: 0,
                question: undefined,
                renewableEnergyRegulatedPrice: 0,
                status: '',
                subject: undefined,
                supplier: this.supplyPoint?.supplier,
                systemServicesRegulatedPrice: 0,
                totalPrice: supplyPointImportPrices.importPermanentMonthlyPay,
                unit: '',
                validFrom: '',
                validTo: '',
            };
        }
        return null;
    }

    private ifCurrentIsTheBestRemoveIt = (offers: IOffer[]): IOffer[] => {
        if (offers.length === 0) {
            return [];
        }

        const firstOffer = R.head(offers);
        const isFirstTheBestOffer = this.isCurrentOffer(firstOffer);
        if (isFirstTheBestOffer) {
            return R.drop(1, offers);
        }
        return offers;
    }

    // We dont load offer id to apollo, because of cache problem
    private isCurrentOffer = (paramOffer: IOffer): boolean => !paramOffer.id;

    public saveContract = (supplyPointOffer: IOffer): void => {
        this.offerSelected = true;
        const supplyPointId = this.supplyPoint.id;

        const contractAction = this.navigateRequestService.isPreviousStep(this.supplyPoint, this.ACTUAL_PROGRESS_STATUS) ?
            this.contractService.deleteSelectedOfferFromContract(this.supplyPoint.contract.contractId) :
            of({});

        contractAction
            .pipe(
                switchMap(() => this.contractService.saveContract(supplyPointOffer.id, supplyPointId)),
                map(({data}) => data.saveContract),
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.sAnalyticsService.sendWebData(
                        {},
                        {
                            email: this.authService.currentUserValue.email,
                        },
                        {},
                        {
                            ACTION: S_ANALYTICS.ACTIONS.CHOOSE_OFFER,
                            supplyPointOffer,
                            supplyPoint: this.supplyPoint,
                        },
                    );
                    this.gtmService.pushEvent({
                        'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        'category': GTM_CONSTS.CATEGORIES.FORM,
                        'dodavatel': removeAccent(supplyPointOffer?.supplier?.name).toLowerCase(),
                        'action': GTM_CONSTS.ACTIONS.SELECT_OFFER,
                        'label': GTM_CONSTS.LABELS.STEP_THREE,
                        'userID': this.authService.hashedUserId,
                    });
                    this.router.navigate(
                        [ROUTES.ROUTER_REQUEST_RECAPITULATION],
                        {
                            queryParams: {
                                supplyPointId,
                            },
                        });
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.offerSelected = false;
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

    public togglePriceDecompositionAction = (showedDetail: boolean, supplyPointOffer: IOffer) => {
        if (showedDetail) {
            this.gtmService.pushEvent({
                'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
                'category': GTM_CONSTS.CATEGORIES.FORM,
                'dodavatel': removeAccent(supplyPointOffer?.supplier?.name).toLowerCase(),
                'action': GTM_CONSTS.ACTIONS.SHOW_DETAIL,
                'label': GTM_CONSTS.LABELS.STEP_THREE,
                'userID': this.authService.hashedUserId,
            });
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
