import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { interval, Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { CONSTS, GTM_CONSTS, S_ANALYTICS } from 'src/app/app.constants';
import { offerValidityMessages } from 'src/app/constants/errors.constant';
import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { FaqService } from 'src/app/services/faq.service';
import { GTMService } from 'src/app/services/gtm.service';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ValidityService } from 'src/app/services/validity.service';
import {
    IOffer,
    ISupplyPointOffers,
} from 'src/common/graphql/models/offer.model';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { SupplyPointOfferComponent } from 'src/common/ui/supply-point-offer/supply-point-offer.component';
import { getConfigStepper, parseGraphQLErrors } from 'src/common/utils';
import { removeAccent } from 'src/common/utils/standalone/remove-accent.fnc';
import {
    addPastOfferToFindSupplyPointOffers,
    filterOffersOnlyActualSupplier,
    ifCurrentIsTheBestRemoveIt,
    isCurrentOffer,
    setTotalPriceWithAnnualConsumption,
    sortByTotalPriceAscend,
} from './offer-selection.utils';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent
    extends AbstractFaqComponent
    implements OnInit, OnDestroy
{
    @ViewChildren('supplyPointOffers')
    public supplyPointOfferComponentChildren: QueryList<SupplyPointOfferComponent>;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private cryptoService: CryptoService,
        private contractService: ContractService,
        public faqService: FaqService,
        private gtmService: GTMService,
        public navigateConsumerService: NavigateConsumerService,
        private offerService: OfferService,
        public route: ActivatedRoute,
        private router: Router,
        public sAnalyticsService: SAnalyticsService,
        private supplyService: SupplyService,
        private validityService: ValidityService
    ) {
        super(faqService, route);
        this.gtmService.loadFormEvent(
            GTM_CONSTS.LABELS.STEP_THREE,
            this.cryptoService.hashedUserId
        );
    }

    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.OFFER_STEP;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;

    public bannerObj: IBannerObj = {};
    public globalError: string[] = [];
    public loadingSupplyPointOffers = true;
    public offerSelected = false;
    public onlyOffersFromActualSupplier = false;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(
        this.ACTUAL_PROGRESS_STATUS
    );
    public supplyPointOffers: IOffer[];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;
    public existsCurrentOffer = false;

    public checkOfferSelectionConstraint$ = interval(CONSTS.INTERVAL_RXJS).pipe(
        startWith(0),
        takeUntil(this.destroy$),
        filter(() => !this.onlyOffersFromActualSupplier)
    );

    ngOnInit() {
        this.sAnalyticsService.installSForm();

        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe((_) => this.cd.markForCheck());

        this.supplyService
            .getSupplyPoint(this.supplyPointId)
            .pipe(
                map(({ data }) => data.getSupplyPoint),
                switchMap(this.setCurrentStateAndFindSupplyPointOffers),
                map(({ data }) => data.findSupplyPointOffers),
                map((supplyPointOffers: ISupplyPointOffers) =>
                    setTotalPriceWithAnnualConsumption(
                        this.supplyPoint,
                        supplyPointOffers
                    )
                ),
                map((supplyPointOffers: ISupplyPointOffers) =>
                    addPastOfferToFindSupplyPointOffers(
                        this.supplyPoint,
                        supplyPointOffers
                    )
                ),
                map(sortByTotalPriceAscend),
                map(ifCurrentIsTheBestRemoveIt),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (findSupplyPointOffers: IOffer[]) => {
                    this.existsCurrentOffer = R.find(isCurrentOffer)(
                        findSupplyPointOffers
                    );
                    this.supplyPointOffers = findSupplyPointOffers;
                    this.loadingSupplyPointOffers = false;
                    this.setTextBannerByContractEndType();
                    if (!this.supplyPoint.withoutSupplier) {
                        this.checkOfferSelectionConstraint$.subscribe(() => {
                            this.onlyOffersFromActualSupplier =
                                this.validityService.validateOffer(
                                    this.supplyPoint
                                );
                            if (this.onlyOffersFromActualSupplier) {
                                this.supplyPointOffers =
                                    filterOffersOnlyActualSupplier(
                                        this.supplyPoint,
                                        this.supplyPointOffers
                                    );
                            }
                            this.cd.markForCheck();
                        });
                    } else {
                        this.cd.markForCheck();
                    }
                },
                (error) => {
                    this.supplyPointOffers = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    }

    public scrollToCurrentOffer = () => {
        const supplyPointOfferComponentCurrent = R.find(
            ({ supplyPointOffer }) => isCurrentOffer(supplyPointOffer)
        )(this.supplyPointOfferComponentChildren);
        const elementToScroll =
            supplyPointOfferComponentCurrent.supplyPointOfferWrapper
                .nativeElement;
        elementToScroll.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    private setCurrentStateAndFindSupplyPointOffers = (
        supplyPoint: ISupplyPoint
    ): Observable<any> => {
        this.navigateConsumerService.checkCorrectStep(
            supplyPoint,
            ProgressStatus.OFFER_STEP
        );
        this.supplyPoint = supplyPoint;
        return this.offerService.findSupplyPointOffers(
            this.supplyPoint.identificationNumber
        );
    };

    public saveContract = (supplyPointOffer: IOffer): void => {
        this.offerSelected = true;
        const supplyPointId = this.supplyPoint.id;

        const contractAction = this.navigateConsumerService.isPreviousStep(
            this.supplyPoint,
            this.ACTUAL_PROGRESS_STATUS
        )
            ? this.contractService.deleteSelectedOfferFromContract(
                  this.supplyPoint.contract.contractId
              )
            : of({});

        contractAction
            .pipe(
                switchMap(() =>
                    this.contractService.saveContract(
                        supplyPointOffer.id,
                        supplyPointId
                    )
                ),
                map(({ data }) => data.saveContract),
                takeUntil(this.destroy$)
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
                        }
                    );
                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        category: GTM_CONSTS.CATEGORIES.FORM,
                        dodavatel: removeAccent(
                            supplyPointOffer?.supplier?.name
                        ).toLowerCase(),
                        action: GTM_CONSTS.ACTIONS.SELECT_OFFER,
                        label: GTM_CONSTS.LABELS.STEP_THREE,
                        userID: this.cryptoService.hashedUserId,
                    });
                    this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                        ProgressStatus.PERSONAL_DATA,
                        {
                            supplyPointId,
                        }
                    );
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.offerSelected = false;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    };

    public setTextBannerByContractEndType = () => {
        if (this.validityService.validateOnlyDateExpiration(this.supplyPoint)) {
            this.bannerObj.text =
                offerValidityMessages.contractEndWithoutTerminate;
        }

        if (
            this.validityService.validateTermWithProlongation(this.supplyPoint)
        ) {
            this.bannerObj.text =
                offerValidityMessages.contractEndWithTerminate;
        }
    };

    public togglePriceDecompositionAction = (
        showedDetail: boolean,
        supplyPointOffer: IOffer
    ) => {
        if (showedDetail) {
            this.gtmService.pushEvent({
                event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
                category: GTM_CONSTS.CATEGORIES.FORM,
                dodavatel: removeAccent(
                    supplyPointOffer?.supplier?.name
                ).toLowerCase(),
                action: GTM_CONSTS.ACTIONS.SHOW_DETAIL,
                label: GTM_CONSTS.LABELS.STEP_THREE,
                userID: this.cryptoService.hashedUserId,
            });
        }
    };

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
