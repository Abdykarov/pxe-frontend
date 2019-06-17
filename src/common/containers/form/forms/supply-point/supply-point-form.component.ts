import {
    ChangeDetectorRef,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CODE_LIST,
    CODE_LIST_TYPES,
    COMMODITY_TYPE_OPTIONS,
    CONTRACT_END_TYPE,
    DISTRIBUTION_RATES_TYPE_DEFINITION,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
} from 'src/app/app.constants';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import {
    commodityTypeFields,
    expirationConfig,
} from './supply-point-form.config';
import {
    convertArrayToObject,
    transformCodeList,
    transformSuppliers,
} from 'src/common/utils';
import { HelpModalComponent } from 'src/common/containers/modal/modals/help/help-modal.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
})
export class SupplyPointFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    public commodityTypeOptions: Array<IOption> = COMMODITY_TYPE_OPTIONS;
    public subjectTypeOptions: Array<IOption> = SUBJECT_TYPE_OPTIONS;
    public codeLists;
    public codeList = CODE_LIST;
    public helpDocuments = {};
    public minDate: Date;
    public suppliers = [];
    public distributionRateType: string = CODE_LIST.DIST_RATE_INDIVIDUAL;
    public expirationConfig = expirationConfig;

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private modalsService: ModalService,
        private supplyService: SupplyService,
    ) {
        super(fb);
        this.minDate = new Date();
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('commodityType')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((commodityType: CommodityType) => {
                this.resetFormError(false);
                this.setFormByCommodity(commodityType);
                this.resetFieldValue('supplierId');
                this.setAnnualConsumptionNTState(commodityType === CommodityType.POWER ? this.getFieldValue('distributionRateId') : null);
            });

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId');
                this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE_MAP[val];
                this.cd.markForCheck();
            });

        this.form.get('distributionRateId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(val => {
                this.setAnnualConsumptionNTState(val);
            });

        this.form.get('contractEndTypeId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.changeByContractEndType(val);
            });

        this.form.get('supplierId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(val => {
                this.helpDocuments = val && val.sampleDocuments ? convertArrayToObject(val.sampleDocuments, 'type') : {};
            });

        this.setFormByCommodity(CommodityType.POWER);
        this.loadCodeLists();
        this.setAnnualConsumptionNTState();
        this.hideAllContractEndType();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public includesBothTariffs = (id: string) => DISTRIBUTION_RATES_TYPE_DEFINITION[DistributionType.BOTH].includes(id);

    public changeByContractEndType(changeByContractEndType: string) {
        const selectedContractEndType = this.expirationConfig[changeByContractEndType];

        R.forEachObjIndexed((show: boolean, field: string) => {
            show ? this.form.get(field).enable() : this.form.get(field).disable();
        }, selectedContractEndType);

        this.cd.markForCheck();
    }

    public hideAllContractEndType() {
        R.forEachObjIndexed((value: string, field: string) => {
            this.form.get(field).disable();
        }, this.expirationConfig[CONTRACT_END_TYPE.CONTRACT_END_TERM]);
    }

    public setFormByCommodity = (commodityType: CommodityType) => {
        R.mapObjIndexed((fields: string[], type: CommodityType) => {
            if (commodityTypeFields[type]) {
                R.map((field: string) => {
                    const fieldControl = this.form.get(field);
                    if (type === commodityType) {
                        fieldControl.enable();
                    } else {
                        fieldControl.disable();
                    }
                }, fields);
            }
        }, commodityTypeFields);

        this.loadSuppliers(commodityType);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form = {
                ...this.form.value,
                supplierId: this.form.value.supplierId && parseInt(this.form.value.supplierId.id, 10),
                address: {
                    ...this.form.value.address,
                    orientationNumber: this.form.value.address.orientationNumber || this.form.value.address.descriptiveNumber,
                },
                expirationDate: this.form.value.expirationDate && this.form.value.expirationDate.toISOString().split('T')[0],
            };
            if (!R.isNil(form.annualConsumptionNT)) {
                form.annualConsumptionNT = parseFloat(form.annualConsumptionNT.replace(',', '.'));
            }
            if (!R.isNil(form.annualConsumptionVT)) {
                form.annualConsumptionVT = parseFloat(form.annualConsumptionVT.replace(',', '.'));
            }
            if (!R.isNil(form.annualConsumption)) {
                form.annualConsumption = parseFloat(form.annualConsumption.replace(',', '.'));
            }
            this.submitAction.emit(form);
        }
    }

    public showHelp = (field, title) => {
        this.modalsService
            .showModal$.next({
                component: HelpModalComponent,
                instanceData: {
                    url: this.helpDocuments[field].url,
                    alt: title,
                    showButton: false,
                },
        });
    }

    public loadCodeLists = () => {
        this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = transformCodeList(data.findCodelistsByTypes);
                this.cd.markForCheck();
            });
    }

    public setAnnualConsumptionNTState = (distributionRateId: string = null) => {
        const annualConsumptionNTControl = this.form.get('annualConsumptionNT');
        if (this.includesBothTariffs(distributionRateId)) {
            annualConsumptionNTControl.enable();
        } else {
            annualConsumptionNTControl.disable();
        }
    }

    public loadSuppliers = (commodityType) => {
        this.supplyService.getSuppliers(commodityType)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.suppliers[commodityType] = transformSuppliers(data.findAllSuppliers);
                this.cd.markForCheck();
            });
    }
}
