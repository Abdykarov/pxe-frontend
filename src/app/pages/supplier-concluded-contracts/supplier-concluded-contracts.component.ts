import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as R from 'ramda';
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    commodityTypes,
    ROUTES,
} from 'src/app/app.constants';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { DocumentService } from 'src/app/services/document.service';
import { IContractWithNameAndSupplyPointEan } from 'src/common/graphql/models/suppplier.model';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { parseRestAPIErrors } from 'src/common/utils';
import { SupplierConcludedContractsConfig} from './supplier-concluded-contracts.config';
import { SupplierService } from 'src/common/graphql/services/supplier.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
    selector: 'lnd-supplier-concluded-contracts',
    templateUrl: './supplier-concluded-contracts.component.html',
    styleUrls: ['./supplier-concluded-contracts.component.scss'],
})
export class SupplierConcludedContractsComponent extends AbstractComponent implements OnInit {

    private _commodityType: CommodityType = null;

    public COMMODITY_TYPE_POWER = CommodityType.POWER;

    // page setting
    public readonly bannerType = BannerTypeImages.SUPPLIER_NULL;
    public readonly routePower = ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_POWER;
    public readonly routeGas = ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_GAS;

    // subjects
    public commodityTypeSubject$: BehaviorSubject<CommodityType> = new BehaviorSubject(CommodityType.POWER);
    public commodityType$ = this.commodityTypeSubject$.asObservable();
    public numberOfPageSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
    public numberOfPage$ = this.commodityTypeSubject$.asObservable();

    // pagination setting
    public readonly itemsPerPage = 50;
    public readonly showBoundaryLinks = true;
    public readonly maxSize = 5;
    public readonly firstText = '<span class="arrow-text">first</span>';
    public readonly previousText = '<span class="arrow-text">prev</span>';
    public readonly nextText = '<span class="arrow-text">next</span>';
    public readonly lastText = '<span class="arrow-text">last</span>';

    // table
    public contractsWithNameAndSupplyPointEan: IContractWithNameAndSupplyPointEan[] = null;
    public tableCols = null;
    public totalItems: number = null;

    // errors
    public formLoading = false;
    public globalError: string[] = [];

    get commodityType(): any {
        return this._commodityType;
    }

    set commodityType(value: any) {
        this._commodityType = value;
        this.commodityTypeSubject$.next(value);
    }

    constructor(
        private cd: ChangeDetectorRef,
        private documentService: DocumentService,
        private router: Router,
        private route: ActivatedRoute,
        private supplierConcludedContractsConfig: SupplierConcludedContractsConfig,
        private supplierService: SupplierService,
    ) {
        super();
    }

    ngOnInit() {
        combineLatest(this.commodityType$, this.numberOfPage$).pipe(
            switchMap(([commodityType, numberOfPage]) => this.getListSupplierContractsBasedOnOffers(commodityType, numberOfPage)),
            map(({data}) =>  data.getListSupplierContractsBasedOnOffers),
            takeUntil(this.destroy$),
        ).subscribe((contractWithNameAndSupplyPointEan: IContractWithNameAndSupplyPointEan[]) => {
            this.contractsWithNameAndSupplyPointEan = contractWithNameAndSupplyPointEan;
            this.totalItems = contractWithNameAndSupplyPointEan.length;
            this.cd.markForCheck();
        });

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                if (R.indexOf(params.commodityType, R.keys(commodityTypes)) < 0) {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.tableCols = this.supplierConcludedContractsConfig.getTableCols(this.commodityType );
                this.commodityType = commodityTypes[params.commodityType];
                this.cd.markForCheck();
            });
    }

    public getListSupplierContractsBasedOnOffers = (commodityType: CommodityType, numberOfPage: any) => {
        return this.supplierService.getListSupplierContractsBasedOnOffers(commodityType, numberOfPage, this.itemsPerPage)
            .pipe(
                takeUntil(this.destroy$),
            );
    }

    public pageChanged = ($event: PageChangedEvent) => {
        if ($event.page) {
            this.numberOfPageSubject$.next($event.page);
        } else {
            this.globalError.push(defaultErrorMessage);
        }
    }

    public downloadPDF = (contractId: string) => {
        this.documentService.getDocument(contractId, IDocumentType.CONTRACT)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.documentService.documentSave(responseDataDocument);
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                },
            );
    }

    // do budoucna
    public openDocument(contractId: string, documentType: IDocumentType) {
        const windowReference = window && window.open();
        this.formLoading = true;
        this.globalError = [];
        this.documentService.getDocument(contractId, documentType)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.formLoading = false;
                    const canBeClosed = this.documentService.documentOpen(responseDataDocument, windowReference);
                    if (windowReference && canBeClosed) {
                        windowReference.close();
                    }
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.formLoading = false;
                    this.globalError.push(message);
                    if (windowReference) {
                        windowReference.close();
                    }
                    this.cd.markForCheck();
                },
            );
    }

    public redirectToOffer = (evt) => {
        evt.preventDefault();
        this.router.navigate([
            this._commodityType === CommodityType.POWER ? ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
        ]);
    }
}
