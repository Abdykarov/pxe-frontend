import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    codeListTypes,
    commodityTypeFields,
    commodityTypeOptions,
} from './supply-point-form.config';
import { CommodityType } from 'src/common/graphql/models/supply.model';
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
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
})
export class SupplyPointFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public isStandalone = true;

    public commodityTypeOptions: Array<IOption> = commodityTypeOptions;
    public codeLists;
    public helpDocuments = {};
    public minDate: Date;
    public suppliers = [];

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

        this.form.get('commodityType')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.resetFormError();
                this.setFormByCommodity(val);
                this.resetFieldValue('supplierId');
            });

        this.form.get('supplierId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.helpDocuments = val && val.sampleDocuments ? convertArrayToObject(val.sampleDocuments, 'type') : {};
            });

        this.setFormByCommodity(CommodityType.POWER);
        this.loadCodelists();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        console.log(this.form);
        console.log(this.formFields);
    }

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
                // TODO - address is hardcoded, coz it is mandatory for service
                address: {
                    street: this.form.value.address,
                    orientationNumber: this.form.value.address,
                    descriptiveNumber: this.form.value.address,
                    city: this.form.value.address,
                    postCode: 12000,
                },
                expirationDate: this.form.value.expirationDate && this.form.value.expirationDate.toISOString().split('T')[0],
            };
            // TODO format annualConsumption*
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

    public loadCodelists = () => {
        this.supplyService.findCodelistsByTypes(codeListTypes, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = transformCodeList(data.findCodelistsByTypes);
                console.log('%c ***** codeLists *****', 'background: #bada55; color: #000; font-weight: bold', data, this.codeLists);
                this.cd.markForCheck();
            });
    }

    public loadSuppliers = (commodityType) => {
        this.supplyService.getSuppliers(commodityType)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.suppliers[commodityType] = transformSuppliers(data.findAllSuppliers);
                console.log('%c ***** suppliers *****', 'background: #bada55; color: #000; font-weight: bold', data, this.suppliers);
                this.cd.markForCheck();
            });
    }
}
