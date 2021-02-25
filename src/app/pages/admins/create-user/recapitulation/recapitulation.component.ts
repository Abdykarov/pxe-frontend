import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    CommodityType,
    ICodelistOptions,
    ISupplyPoint,
    ProgressStatus,
    SubjectType,
} from '../../../../../common/graphql/models/supply.model';
import {combineLatest, Observable} from 'rxjs';
import {CODE_LIST_TYPES} from '../../../../app.constants';
import {map, takeUntil} from 'rxjs/operators';
import {parseGraphQLErrors, removeAccent, transformCodeList} from '../../../../../common/utils';
import {SupplyService} from '../../../../../common/graphql/services/supply.service';
import {formFields} from '../../../../../common/containers/form/forms/personal-info/personal-info-form.config';
import {Validators} from '@angular/forms';

import * as R from 'ramda';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {

    constructor(
        private cd: ChangeDetectorRef,
        private supplyService: SupplyService,
    ) {
        super();

        this.formFields.controls = R.mapObjIndexed((a, field) => {
            const [defaultValue, validators] = a;
            let aaa = [];
            if (validators) {
                aaa = R.reject(fc => fc.prototype.isRequiredValidator)(validators);
            }
            return [defaultValue, aaa];
        })({...this.formFields.controls});
    }
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public codeLists = null;
    public formFields = formFields;

    public codeLists$: Observable<ICodelistOptions> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );



    public supplyPointConfig: ISupplyPoint = {
        id: '5456',
        name: 'Byt praha',
        allowedOperations: [],
        commodityType: CommodityType.POWER,
        supplier: {
            id: '',
            name: 'PRE',
            vatNumber: '',
            logoPath: '',
            sampleDocuments: [],
        },
        identificationNumber: '',
        address: null,
        distributionRate: null,
        circuitBreaker: null,
        phases: null,
        annualConsumptionNT: 0,
        annualConsumptionVT: 0,
        expirationDate: '0',
        subject: null,
        lastAnnualConsumptionNT: 0,
        lastAnnualConsumptionVT: 0,
        lastVersionOfSupplyPoint: false,
        contractEndType: null,
        timeToContractEnd: 0,
        timeToContractEndPeriod: null,
        contract: null,
        progressStatus: ProgressStatus.SUPPLY_POINT,
    };

    ngOnInit () {
        combineLatest([this.codeLists$])
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([codeLists]) => {
                    this.codeLists = codeLists;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }
}
