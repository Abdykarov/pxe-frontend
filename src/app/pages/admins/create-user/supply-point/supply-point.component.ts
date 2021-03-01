import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';

import * as R from 'ramda';

import {AbstractComponent} from 'src/common/abstract.component';
import {formFields} from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import {IFieldError} from 'src/common/containers/form/models/form-definition.model';
import {SUPPLY_POINT_EDIT_TYPE} from 'src/app/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {CommodityType, ISupplyPoint, } from '../../../../../common/graphql/models/supply.model';
import {map, takeUntil} from 'rxjs/operators';
import {parseGraphQLErrors} from '../../../../../common/utils';
import {AskForOfferService} from '../../../../../common/graphql/services/ask-for-offer.service';
import {
    ISupplyPointGasAttributesImport,
    ISupplyPointImport,
    ISupplyPointImportInput,
    ISupplyPointPowerAttributesImport,
} from '../../../../../common/graphql/models/ask-for-offer';

@Component({
    selector: 'pxe-create-user-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent implements OnInit {
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public supplyPointImport: any = null;
    public supplyPoint: any = null;

    public askForOfferId = null;

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.askForOfferId = route.snapshot.queryParams.askForOfferId;

        this.editMode = this.askForOfferId ? SUPPLY_POINT_EDIT_TYPE.PROLONG : SUPPLY_POINT_EDIT_TYPE.NORMAL;

        this.formFields.controls = R.mapObjIndexed((a, field) => {
            const [defaultValue, validators] = a;
            let aaa = [];
            if (validators) {
                aaa = R.reject(fc => fc.toString() === Validators.required.toString())(validators);
            }
            return [defaultValue, aaa];
        })({...this.formFields.controls});
    }

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

    ngOnInit() {
        super.ngOnInit();

        this.askForOfferService.
            findSupplyPointImport(this.askForOfferId)
                .pipe(
                    takeUntil(this.destroy$),
                    map(({data}) => data.findSupplyPointImport),
                )
                .subscribe( supplyPointImport => {
                    this.supplyPointImport = supplyPointImport;
                    this.supplyPoint = this.supplyPointFromSupplyPointImport(supplyPointImport);
                    console.log('___');
                    console.log(this.supplyPoint);
                    this.cd.markForCheck();
                });

    }

    public save = (supplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let supplyPointAction;

        const supplyPoint: ISupplyPointImportInput = R.pick([
            'supplierId',
            'name',
            'address',
            'expirationDate',
            'subjectTypeId',
            'contractEndTypeId',
            'timeToContractEnd',
            'timeToContractEndPeriodId',
        ], supplyPointFormData);
        supplyPoint.askForOfferId = this.askForOfferId;

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributesImport =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'phasesId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionNTUnit',
                    'annualConsumptionVT',
                    'annualConsumptionVTUnit',
                ], supplyPointFormData);
            supplyPointAction = this.askForOfferService.createPowerSupplyPointImport(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributesImport =
                R.pick([
                    'eic',
                    'annualConsumption',
                    'annualConsumptionUnit',
                ], supplyPointFormData);
            supplyPointAction = this.askForOfferService.createGasSupplyPointImport(supplyPoint, gasAttributes);
        }

        supplyPointAction
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({data}) => data.createPowerSupplyPointImport ||
                        data.createGasSupplyPointImport,
                ),
            )
            .subscribe(
                (supplyPointId) => {
                    this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
                        queryParams: {
                            askForOfferId: this.askForOfferId,
                        },
                    });
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
