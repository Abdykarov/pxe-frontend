import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import * as R from 'ramda';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import {
    commodityTypes,
    ROUTES,
    urlCommodityToCommodityType,
} from 'src/app/app.constants';
import { IPaginationConfig } from 'src/app/pages/suppliers/concluded-contracts/concluded-contracts.model';
import { DocumentService } from 'src/app/services/document.service';
import {
    DocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IPaginatedContractsWithNameAndSupplyPoint } from 'src/common/graphql/models/suppplier.model';
import { SupplierService } from 'src/common/graphql/services/supplier.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    parseGraphQLErrors,
    parseRestAPIErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { ConcludedContractsConfig } from './concluded-contracts.config';

@Component({
    selector: 'lnd-supplier-concluded-contracts',
    templateUrl: './concluded-contracts.component.html',
    styleUrls: ['./concluded-contracts.component.scss'],
})
export class ConcludedContractsComponent
    extends AbstractComponent
    implements OnInit
{
    public COMMODITY_TYPE_POWER = CommodityType.POWER;

    public readonly bannerType = BannerTypeImages.SUPPLIER_NULL;
    public readonly routePower =
        ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_POWER;
    public readonly routeGas = ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_GAS;

    public commodityTypeSubject$: BehaviorSubject<CommodityType> =
        new BehaviorSubject(CommodityType.POWER);
    public commodityType$ = this.commodityTypeSubject$.asObservable();
    public numberOfPagesSubject$: BehaviorSubject<number> = new BehaviorSubject(
        1
    );
    public numberOfPages$ = this.numberOfPagesSubject$.asObservable();
    public commodityType: CommodityType = null;
    public downloadingContractIds: string[] = [];

    public paginationConfig: IPaginationConfig = null;

    public paginatedContractsWithNameAndSupplyPoint: IPaginatedContractsWithNameAndSupplyPoint =
        null;
    public tableCols = null;

    public formLoading = false;
    public globalError: string[] = [];

    constructor(
        private cd: ChangeDetectorRef,
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private router: Router,
        private supplierConcludedContractsConfig: ConcludedContractsConfig,
        private supplierService: SupplierService
    ) {
        super();
    }

    ngOnInit() {
        this.paginationConfig =
            this.supplierConcludedContractsConfig.paginationConfig;

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                filter((params) => {
                    if (
                        R.indexOf(
                            urlCommodityToCommodityType[params.commodityType],
                            R.keys(commodityTypes)
                        ) < 0
                    ) {
                        this.router.navigate([this.routePower]);
                        return false;
                    }
                    return true;
                })
            )
            .subscribe((params) => {
                this.commodityType =
                    commodityTypes[
                        urlCommodityToCommodityType[params.commodityType]
                    ];
                this.commodityTypeSubject$.next(this.commodityType);
                this.cd.markForCheck();
            });

        combineLatest([this.commodityType$, this.numberOfPages$])
            .pipe(
                switchMap(([commodityType, numberOfPage]) => {
                    this.globalError = [];
                    this.formLoading = true;
                    return this.supplierService.getListSupplierContractsBasedOnOffers(
                        {
                            commodityType,
                            pagination: {
                                first: numberOfPage - 1,
                                offset: this.paginationConfig.itemsPerPage,
                            },
                        }
                    );
                }),
                map(({ data }) => data.listSupplierContractsBasedOnOffers),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (
                    paginatedContractsWithNameAndSupplyPoint: IPaginatedContractsWithNameAndSupplyPoint
                ) => {
                    this.paginatedContractsWithNameAndSupplyPoint =
                        paginatedContractsWithNameAndSupplyPoint;
                    this.tableCols =
                        this.supplierConcludedContractsConfig.getTableCols(
                            this.commodityType
                        );
                    scrollToElementFnc('top');
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.formLoading = false;
                    this.cd.markForCheck();
                }
            );
    }

    public pageChanged = ($event: PageChangedEvent) => {
        if ($event && $event.page) {
            this.numberOfPagesSubject$.next($event.page);
        } else {
            this.globalError = [defaultErrorMessage];
            this.cd.markForCheck();
        }
    };

    public downloadPDF = (contractId: string) => {
        this.downloadingContractIds = R.append(
            contractId,
            this.downloadingContractIds
        );
        this.globalError = [];
        this.documentService
            .getDocument(contractId, DocumentType.CONTRACT)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.downloadingContractIds = R.without(
                        contractId,
                        this.downloadingContractIds
                    );
                    this.documentService.documentSave(responseDataDocument);
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.downloadingContractIds = R.without(
                        contractId,
                        this.downloadingContractIds
                    );
                    this.globalError = [message];
                    this.cd.markForCheck();
                }
            );
    };

    // do budoucna
    // public openDocument(contractId: string, documentType: DocumentType) {
    //     const windowReference = window && window.open();
    //     this.formLoading = true;
    //     this.globalError = [];
    //     this.documentService.getDocument(contractId, documentType)
    //         .pipe(
    //             takeUntil(this.destroy$),
    //         )
    //         .subscribe(
    //             (responseDataDocument: IResponseDataDocument) => {
    //                 this.formLoading = false;
    //                 const canBeClosed = this.documentService.documentOpen(responseDataDocument, windowReference);
    //                 if (windowReference && canBeClosed) {
    //                     windowReference.close();
    //                 }
    //                 this.cd.markForCheck();
    //             },
    //             (error) => {
    //                 const message = parseRestAPIErrors(error);
    //                 this.formLoading = false;
    //                 this.globalError.push(message);
    //                 if (windowReference) {
    //                     windowReference.close();
    //                 }
    //                 this.cd.markForCheck();
    //             },
    //         );
    // }

    public redirectToOffer = (evt) => {
        evt.preventDefault();
        this.router.navigate([
            this.commodityType === CommodityType.POWER
                ? ROUTES.ROUTER_SUPPLY_OFFER_POWER
                : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
        ]);
    };
}
