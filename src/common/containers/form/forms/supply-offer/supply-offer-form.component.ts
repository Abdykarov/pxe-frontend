import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL,
    codeListTypes,
    commodityTypeFields,
    commodityTypeOptions,
    distributionRatesTypeDefinition,
    SUBJECT_TYPE_TO_DIST_RATE,
    subjectTypeOptions,
} from './supply-offer-form.config';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import {
    convertArrayToObject,
    transformCodeList,
    transformSuppliers,
} from 'src/common/utils';
import { HelpModalComponent } from 'src/common/containers/modal/modals/help/help-modal.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalLoaderService } from 'src/common/containers/modal/modal-loader.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-offer-form',
    templateUrl: './supply-offer-form.component.html',
    styleUrls: ['./supply-offer-form.component.scss'],
})
export class SupplyOfferFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public commodityType = CommodityType.POWER;

    @Input()
    public id: number = null;

    public commodityTypeOptions: Array<IOption> = commodityTypeOptions;
    public subjectTypeOptions: Array<IOption> = subjectTypeOptions;
    public codeLists;
    public helpDocuments = {};
    public minDate: Date;
    public suppliers = [];
    public distributionRateType: string = CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL;

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private modalsLoaderService: ModalLoaderService,
        private supplyService: SupplyService,
    ) {
        super(fb);
        this.minDate = new Date();
    }

    ngOnInit() {
        super.ngOnInit();
        console.log('----------INIT');
        this.clearFormArray((this.form.controls['benefits'] as FormArray));
        (this.form.controls['benefits'] as FormArray).push(this.addBenefit());
        (this.form.controls['benefits'] as FormArray).push(this.addBenefit());
        this.form.controls['id'].patchValue(this.id);
        this.form.controls['commodityType'].patchValue(this.commodityType);

        // this.form.get('commodityType')
        //     .valueChanges
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(val => {
        //         this.resetFormError();
        //         this.setFormByCommodity(val);
        //         this.resetFieldValue('supplierId');
        //     });
        //
        // this.form.get('subjectTypeId')
        //     .valueChanges
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe((val: string) => {
        //         this.resetFieldValue('distributionRateId');
        //         this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE[val];
        //         this.cd.markForCheck();
        //     });
        //
        // this.form.get('distributionRateId')
        //     .valueChanges
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(val => {
        //         this.setAnnualConsumptionNTState(val);
        //     });
        //
        // this.form.get('supplierId')
        //     .valueChanges
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe(val => {
        //         this.helpDocuments = val && val.sampleDocuments ? convertArrayToObject(val.sampleDocuments, 'type') : {};
        //     });
        //
        // this.setFormByCommodity(CommodityType.POWER);
        // this.loadCodeLists();
        // this.setAnnualConsumptionNTState();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public addBenefit = () => {
        return this.fb.group({
            value: [null],
        });
    }

    public includesBothTariffs = (id: string) => distributionRatesTypeDefinition[DistributionType.BOTH].includes(id);

    public setFormByCommodity = (commodityType: CommodityType) => {
        R.mapObjIndexed((fields, type) => {
            if (commodityTypeFields[type]) {
                R.map((field) => {
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
                supplierId: this.form.value.supplierId && this.form.value.supplierId.id,
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
        this.modalsLoaderService
            .showModal.next({
                component: HelpModalComponent,
                instanceData: {
                    url: this.helpDocuments[field].url,
                    alt: title,
                    showButton: false,
                },
        });
    }

    public loadCodeLists = () => {
        this.supplyService.findCodelistsByTypes(codeListTypes, 'cs')
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
