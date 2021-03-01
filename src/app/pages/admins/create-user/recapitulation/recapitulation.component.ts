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
import {AskForOfferService} from '../../../../../common/graphql/services/ask-for-offer.service';
import {ActivatedRoute} from '@angular/router';
import {ISupplyPointImport} from '../../../../../common/graphql/models/ask-for-offer';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private supplyService: SupplyService,
    ) {
        super();
        this.askForOfferId = route.snapshot.queryParams.askForOfferId;

        this.formFields.controls = R.mapObjIndexed((a, field) => {
            const [defaultValue, validators] = a;
            let aaa = [];
            if (validators) {
                aaa = R.reject(fc => fc.prototype.isRequiredValidator)(validators);
            }
            return [defaultValue, aaa];
        })({...this.formFields.controls});
    }

    public supplyPoint: null;
    public askForOfferId = null;
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

    private supplyPointFromSupplyPointImport = (supplyPointImport: ISupplyPointImport): any => {
        const data = {
            ...supplyPointImport,
            ...supplyPointImport?.supplyPointPowerAttributes,
            ...supplyPointImport?.supplyPointGasAttributes,
            commodityType: supplyPointImport?.supplyPointGasAttributes?.eic ?
                CommodityType.GAS : CommodityType.POWER,
            identificationNumber: supplyPointImport?.supplyPointPowerAttributes?.ean ||
                supplyPointImport?.supplyPointGasAttributes?.eic,
        };

        return data;
    }

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

        this.askForOfferService.
            findSupplyPointImport(this.askForOfferId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.findSupplyPointImport),
            )
            .subscribe( supplyPointImport => {
                this.supplyPoint = supplyPointImport;
                console.log(this.supplyPoint);
                console.log(supplyPointImport);
                this.cd.markForCheck();
            });
    }

    public submit = (data) => {
        const aaa = this.supplyPoint;
        // @ts-ignore
        aaa?.personalData = data;
        // @ts-ignore
        const dadaaasdad = this.supplyPoint.supplyPointPowerAttributes;
        // @ts-ignore
        delete dadaaasdad['__typename'];
        // @ts-ignore
        delete aaa['supplyPointGasAttributes'];
        // @ts-ignore
        delete aaa['supplyPointPowerAttributes'];
        // @ts-ignore
        delete aaa['__typename'];
        // @ts-ignore
        delete aaa['address']['__typename'];
        // @ts-ignore
        this.askForOfferService.createPowerSupplyPointImport(aaa, dadaaasdad).subscribe();
    }
}
