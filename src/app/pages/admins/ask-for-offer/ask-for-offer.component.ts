import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { IResponseDataDocument } from 'src/app/services/model/document.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    ContractUploadStatus,
    ContractUploadStatusUrl,
    IPaginatedAskForOffer,
} from 'src/common/graphql/models/ask-for-offer';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    downloadFile,
    parseGraphQLErrors,
    parseRestAPIErrors,
} from 'src/common/utils';
import {
    confirmDeleteAskForOfferInfo,
    paginationConfig,
    tableConfig,
} from './ask-for-offer.config';

@Component({
    selector: 'pxe-ask-for-offer',
    templateUrl: './ask-for-offer.component.html',
    styleUrls: ['./ask-for-offer.component.scss'],
})
export class AskForOfferComponent extends AbstractComponent implements OnInit {
    public readonly BannerTypeImages = BannerTypeImages;
    public readonly ContractUploadStatus = ContractUploadStatus;
    public readonly numberOfPagesSubject$: BehaviorSubject<number> =
        new BehaviorSubject(1);
    public readonly numberOfPages$ = this.numberOfPagesSubject$.asObservable();
    public readonly paginationConfig = paginationConfig;
    public readonly routerParamsSubject$: BehaviorSubject<any> =
        new BehaviorSubject(ContractUploadStatus.NEW);
    public readonly routerParams$ = this.routerParamsSubject$.asObservable();
    public readonly tableConfig = tableConfig;
    public readonly titleMapping = {
        [this.CONSTS.PATHS.ASK_FOR_OFFER_NEW]: 'P??ijat?? faktury',
        [this.CONSTS.PATHS.ASK_FOR_OFFER_IN_PROGRESS]: 'Rozpracovan?? faktury',
        [this.CONSTS.PATHS.ASK_FOR_OFFER_PROCESSED]: 'Uzav??en?? faktury',
    };

    public loading = true;
    public globalError: string[] = [];
    public paginatedAskForOffer: IPaginatedAskForOffer = null;
    public downloadingAskForOfferIds: string[] = [];

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private http: HttpClient,
        private modalsService: ModalService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();

        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.routerParamsSubject$.next(params);
        });

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(this.destroy$),
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq(
                            'modalType',
                            CONSTS.MODAL_TYPE.CONFIRM_DELETE_ASK_FOR_OFFER
                        ),
                    ])
                )
            )
            .subscribe((modal) => {
                if (modal.confirmed) {
                    this.globalError = [];
                    this.askForOfferService
                        .deleteAskForOffer(modal.data, {
                            statuses: [
                                ContractUploadStatusUrl[
                                    this.routerParamsSubject$.getValue().type
                                ],
                            ],
                            pagination: {
                                first:
                                    this.numberOfPagesSubject$.getValue() - 1,
                                offset: this.paginationConfig.itemsPerPage,
                            },
                        })
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            (_) => {
                                this.modalsService.showModal$.next(
                                    confirmDeleteAskForOfferInfo()
                                );
                            },
                            (error) => {
                                const { globalError } =
                                    parseGraphQLErrors(error);
                                this.globalError = globalError;
                                this.loading = false;
                                this.cd.markForCheck();
                            }
                        );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    ngOnInit(): void {
        combineLatest([this.routerParams$, this.numberOfPages$])
            .pipe(
                switchMap(([{ type }, numberOfPage]) => {
                    this.globalError = [];
                    this.loading = true;
                    return this.askForOfferService.listAskForOffer({
                        statuses: [ContractUploadStatusUrl[type]],
                        pagination: {
                            first: numberOfPage - 1,
                            offset: this.paginationConfig.itemsPerPage,
                        },
                    });
                }),
                map(({ data }) => data.listAskForOffer),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (paginatedAskForOffer: IPaginatedAskForOffer) => {
                    this.loading = false;
                    this.paginatedAskForOffer = paginatedAskForOffer;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.loading = false;
                    this.cd.markForCheck();
                }
            );
    }

    public routerToCreateUser = (askForOfferId: string, email: string) =>
        this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
            queryParams: {
                askForOfferId,
                email,
            },
        });

    public createAskForOffer = () => {
        this.askForOfferService
            .createAskForOffer()
            .pipe(
                map(({ data }) => data.createAskForOffer),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (askForOfferId: string) => {
                    this.routerToCreateUser(
                        askForOfferId,
                        CONSTS.ASK_FOR_OFFER.MANUALLY_ADD_EMAIL
                    );
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.loading = false;
                    this.cd.markForCheck();
                }
            );
    };

    public delete = (askForOfferId: string): void => {
        this.modalsService.showModal$.next({
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_ASK_FOR_OFFER,
            instanceData: {
                confirmText: `Opravdu chcete smazat ????dost?`,
                titleConfirm: 'ANO SMAZAT',
                data: askForOfferId,
            },
        });
    };

    public pageChanged = ($event: PageChangedEvent) => {
        if ($event && $event.page) {
            this.numberOfPagesSubject$.next($event.page);
        } else {
            this.globalError = [defaultErrorMessage];
            this.cd.markForCheck();
        }
    };

    public downloadAskForOffer = (
        askForOfferId: string,
        documentId: string
    ) => {
        this.globalError = [];
        this.downloadingAskForOfferIds = R.append(
            askForOfferId,
            this.downloadingAskForOfferIds
        );

        downloadFile(
            this.http,
            `v1.0/ask-for-offer/uploaded-document/${documentId}`
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.downloadingAskForOfferIds = R.without(
                        askForOfferId,
                        this.downloadingAskForOfferIds
                    );
                    this.askForOfferService.documentSave(responseDataDocument);
                    this.cd.markForCheck();
                },
                (error) => {
                    this.downloadingAskForOfferIds = R.without(
                        askForOfferId,
                        this.downloadingAskForOfferIds
                    );
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                }
            );
    };

    public downloadAskForOffersZipArchive = (askForOfferId: string) => {
        this.globalError = [];
        this.downloadingAskForOfferIds = R.append(
            askForOfferId,
            this.downloadingAskForOfferIds
        );

        downloadFile(this.http, `v1.0/ask-for-offer/${askForOfferId}/archive`)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.askForOfferService.documentSave(responseDataDocument);
                    this.downloadingAskForOfferIds = R.without(
                        askForOfferId,
                        this.downloadingAskForOfferIds
                    );
                    this.cd.markForCheck();
                },
                (error) => {
                    this.downloadingAskForOfferIds = R.without(
                        askForOfferId,
                        this.downloadingAskForOfferIds
                    );
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                }
            );
    };
}
