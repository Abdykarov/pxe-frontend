import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { HttpClient} from '@angular/common/http';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import {
    filter,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { PageChangedEvent} from 'ngx-bootstrap';

import { AbstractComponent } from 'src/common/abstract.component';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CONSTS } from 'src/app/app.constants';
import {
    confirmDeleteAskForOfferInfo,
    paginationConfig,
    tableConfig,
} from './ask-for-offer.config';
import {
    ContractUploadStatus,
    ContractUploadStatusUrl,
    IPaginatedAskForOffer,
} from 'src/common/graphql/models/ask-for-offer';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import {
    downloadFile,
    parseGraphQLErrors,
    parseRestAPIErrors,
} from 'src/common/utils';
import { IResponseDataDocument} from 'src/app/services/model/document.model';
import { ModalService } from 'src/common/containers/modal/modal.service';

@Component({
    selector: 'pxe-ask-for-offer',
    templateUrl: './ask-for-offer.component.html',
    styleUrls: ['./ask-for-offer.component.scss'],
})
export class AskForOfferComponent extends AbstractComponent implements OnInit {
    public readonly BannerTypeImages = BannerTypeImages;
    public readonly ContractUploadStatus = ContractUploadStatus;
    public readonly numberOfPagesSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
    public readonly numberOfPages$ = this.numberOfPagesSubject$.asObservable();
    public readonly paginationConfig = paginationConfig;
    public readonly routerParamsSubject$: BehaviorSubject<any> = new BehaviorSubject(ContractUploadStatus.NEW);
    public readonly routerParams$ = this.routerParamsSubject$.asObservable();
    public readonly tableConfig = tableConfig;
    public readonly titleMapping = {
        [this.CONSTS.PATHS.ASK_FOR_OFFER_NEW]: 'Přijaté faktury',
        [this.CONSTS.PATHS.ASK_FOR_OFFER_IN_PROGRESS]: 'Rozpracované faktury',
        [this.CONSTS.PATHS.ASK_FOR_OFFER_PROCESSED]: 'Uzavřené faktury',
    };

    public loading = true;
    public globalError: string[] = [];
    public paginatedAskForOffer: IPaginatedAskForOffer = null;

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private http: HttpClient,
        private modalsService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();

        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.routerParamsSubject$.next(params);
            });


        this.modalsService.closeModalData$
            .pipe(
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq('modalType', CONSTS.MODAL_TYPE.CONFIRM_DELETE_ASK_FOR_OFFER),
                    ]),
                ),
            )
            .subscribe(modal => {
                if (modal.confirmed) {
                    this.globalError = [];
                    this.askForOfferService.deleteAskForOffer(
                        modal.data,
                        {
                            statuses: [ContractUploadStatusUrl[this.routerParamsSubject$.getValue().type]],
                            pagination: {
                                first: this.numberOfPagesSubject$.getValue() - 1,
                                offset: this.paginationConfig.itemsPerPage,
                            },
                        })
                        .pipe(
                            takeUntil(this.destroy$),
                        )
                        .subscribe(_ => {
                                this.modalsService
                                    .showModal$.next(confirmDeleteAskForOfferInfo());
                            },
                            error => {
                                const { globalError } = parseGraphQLErrors(error);
                                this.globalError = globalError;
                                this.loading = false;
                                this.cd.markForCheck();
                            },
                        );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    ngOnInit(): void {
        combineLatest([this.routerParams$, this.numberOfPages$])
            .pipe(
                switchMap(([{type}, numberOfPage]) => {
                    this.globalError = [];
                    this.loading = true;
                    return this.askForOfferService.listAskForOffer({
                            statuses: [ContractUploadStatusUrl[type]],
                            pagination: {
                                first: numberOfPage - 1,
                                offset: this.paginationConfig.itemsPerPage,
                            },
                        });
                    },
                ),
                map(({data}) =>  data.listAskForOffer),
                takeUntil(this.destroy$),
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
                },
            );

    }

    public routerToCreateUser = (askForOfferId: string) => this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
        queryParams: {
            askForOfferId,
        },
    })

    public delete = (askForOfferId: string): void => {
        this.modalsService
            .showModal$.next({
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_ASK_FOR_OFFER,
            instanceData: {
                confirmText: `Opravdu chcete smazat žádost?`,
                titleConfirm: 'ANO SMAZAT',
                data: askForOfferId,
            },
        });
    }

    public pageChanged = ($event: PageChangedEvent) => {
        if ($event && $event.page) {
            this.numberOfPagesSubject$.next($event.page);
        } else {
            this.globalError = [defaultErrorMessage];
            this.cd.markForCheck();
        }
    }

    public downloadAskForOffer = (documentId: string) => {
        this.globalError = [];
        this.loading = true;
        downloadFile(this.http, `v1.0/ask-for-offer/uploaded-document/${documentId}`)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.askForOfferService.documentSave(responseDataDocument);
                    this.loading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                },
            );
    }

    public downloadAskForOffersZipArchive = (askForOfferId: string) => {
        this.globalError = [];
        this.loading = true;
        downloadFile(this.http, `v1.0/ask-for-offer/${askForOfferId}/archive`)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.askForOfferService.documentSave(responseDataDocument);
                    this.loading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                },
            );
    }
}
