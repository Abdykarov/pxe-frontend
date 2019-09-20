import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    commodityTypes,
    ROUTES,
} from 'src/app/app.constants';
import { DocumentService } from 'src/app/services/document.service';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { IsDatePast } from 'src/common/pipes/is-date-past/is-date-past.pipe';
import { parseRestAPIErrors } from 'src/common/utils';
import { SupplierConcludedContractsConfig, supplyPointsSource } from './supplier-concluded-contracts.config';

@Component({
    selector: 'lnd-supplier-concluded-contracts',
    templateUrl: './supplier-concluded-contracts.component.html',
    styleUrls: ['./supplier-concluded-contracts.component.scss'],
})
export class SupplierConcludedContractsComponent extends AbstractComponent implements OnInit {
    constructor(
        private cd: ChangeDetectorRef,
        private documentService: DocumentService,
        private isDatePast: IsDatePast,
        private router: Router,
        private route: ActivatedRoute,
        private supplierConcludedContractsConfig: SupplierConcludedContractsConfig,
    ) {
        super();
    }
    public readonly routePower = ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_POWER;
    public readonly routeGas = ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_GAS;
    public readonly ITEMS_PER_PAGE = 50;
    public readonly SHOW_BOUNDARY_LINKS = true;
    public readonly MAX_SIZE = 5;
    public supplyPoints: any[] = supplyPointsSource;
    public tableCols = null;
    public COMMODITY_TYPE_POWER = CommodityType.POWER;

    public totalItems = 1108;
    public formLoading = false;
    public globalError: string[] = [];

    public supplyPointResult: ISupplyPoint[] = null;
    public commodityType = CommodityType.POWER;

    public pageChanged = ($event) => {
        console.log($event);
    }


    ngOnInit() {
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
                this.commodityType = commodityTypes[params.commodityType];
                this.tableCols = this.supplierConcludedContractsConfig.getTableCols(this.commodityType );
                // nutno zamyslet se nad stavama po ubteragaci skuzeb + prepinani mezi
                // commodity a aktualnost (prebliknuti zmena textace atd nez se to nacte dodelani loading?)
                this.supplyPointResult = R.filter(
                    (supplyPoint: ISupplyPoint) =>
                        supplyPoint.commodityType === this.commodityType,
                    this.supplyPoints);
                console.log(this.commodityType);
                this.cd.markForCheck();
            });

    }

    downloadPdf = (contractId: string) => {
        this.openDocument(contractId, IDocumentType.CONTRACT);
    }

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
            this.commodityType === CommodityType.POWER ? ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
        ]);
    }
}
