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
    combineLatest,
    Observable,
} from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { CODE_LIST_TYPES } from 'src/app/app.constants';
import { CreateUserFacade } from 'src/app/pages/admins/create-user/create-user.facade';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import {
    ICodelistOptions,
    ISupplyPoint,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import {
    parseGraphQLErrors,
    removeRequiredValidators,
    transformCodeList,
} from 'src/common/utils';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public codeLists = null;
    public formFields = formFields;

    public subjectType = SubjectType;
    public supplyPoint$: Observable<ISupplyPoint> = this.createUserFacade.activeSupplyPoint$;
    public codeLists$: Observable<ICodelistOptions> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private createUserFacade: CreateUserFacade,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.formFields.controls = removeRequiredValidators(this.formFields.controls);
    }

    ngOnInit () {
        super.ngOnInit();
        this.codeLists$
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (codeLists) => {
                    this.codeLists = codeLists;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public submit = (personalData, activeSupplyPoint: ISupplyPoint) => {
        const supplyPoint: ISupplyPointImportInput = this.supplyPointImportService.mapSupplyPointToSupplyPointInput(activeSupplyPoint);
        supplyPoint.personalData = personalData;
        supplyPoint.importPricePerKwPowerVT = activeSupplyPoint.importPricePerKwPowerVT;
        supplyPoint.importPricePerKwPowerNT = activeSupplyPoint.importPricePerKwPowerNT;
        supplyPoint.importPricePerKwGas = activeSupplyPoint.importPricePerKwGas;
        supplyPoint.importPriceTotalPerYear = activeSupplyPoint.importPriceTotalPerYear;
        delete supplyPoint?.address['__typename'];

        this.supplyPointImportService.createSupplyPointImport(
                this.createUserFacade.getAskForOfferId(),
                supplyPoint,
            )
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({data}) => data.createSupplyPointImport,
                ),
            )
            .subscribe(newSupplyPoint => {
                this.createUserFacade.setActiveSupplyPoint(newSupplyPoint);
                this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_PRICES], {
                    queryParams: this.createUserFacade.queryParamsSubject$.getValue(),
                });
            });
    }

    public backStep = () => this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
        queryParams: this.createUserFacade.queryParamsSubject$.getValue(),
    })
}
