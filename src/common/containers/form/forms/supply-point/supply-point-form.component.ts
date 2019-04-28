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
    commodityTypeFields,
    commodityTypeOptions,
} from './supply-point-form.config';
import {
    CommodityType,
    ICodelistMap,
} from 'src/common/graphql/models/supply.model';
import { convertArrayToObject } from 'src/common/utils';
import { HelpModalComponent } from 'src/common/containers/modal/modals/help/help-modal.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';
import { ModalLoaderService } from 'src/common/containers/modal/modal-loader.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
    // inputs: [
    //     'formSent',
    //     'formFields',
    //     'formLoading',
    //     'globalError',
    //     'fieldError',
    // ],
    // outputs: [
    //     'submitAction',
    // ],
})
export class SupplyPointFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public isStandalone = true;

    public commodityTypeOptions: Array<IOption> = commodityTypeOptions;
    public codeLists;
    public helpDocuments = {};
    public suppliers = [];

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private modalsLoaderService: ModalLoaderService,
        private supplyService: SupplyService,
    ) {
        super(fb);
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

        this.setFormByCommodity(CommodityType.ELECTRICITY);
        this.loadCodelists();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
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
        if (this.form.valid || 1) {
            const form = {
                ...this.form.value,
                supplierId: this.form.value.supplierId && this.form.value.supplierId.id,
                address: {
                    street: this.form.value.address,
                    orientationNumber: this.form.value.address,
                    descriptiveNumber: this.form.value.address,
                    city: this.form.value.address,
                    postCode: this.form.value.address,
                },
                expirationDate: this.form.value.expirationDate && this.form.value.expirationDate.toISOString().split('T')[0],
            };
            // TODO format annualConsumption*
            this.submitAction.emit(form);
        }
    }

    public showHelp = (field, title) => {
        this.modalsLoaderService
            .showModal.next({
            component: HelpModalComponent,
            instanceData: {
                title: title,
                alt: title,
                url: this.helpDocuments[field].url,
            },
        });
    }

    public loadCodelists = () => {
        const codeListTypes = ['DSTSAZ', 'JISTIC'];
        this.supplyService.findCodelistsByTypes(codeListTypes, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = this.transformCodeList(data.findCodelistsByTypes);
                console.log('%c ***** codeLists *****', 'background: #bada55; color: #000; font-weight: bold', data, this.codeLists);
                this.cd.markForCheck();
            });
    }

    public loadSuppliers = (commodityType) => {
        this.supplyService.getSuppliers(commodityType)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.suppliers[commodityType] = this.transformSuppliers(data.findAllSuppliers);
                console.log('%c ***** suppliers *****', 'background: #bada55; color: #000; font-weight: bold', this.suppliers);
                this.cd.markForCheck();
            });
    }

    // TODO util fnc
    public transformCodeList = (data: ICodelistMap[]) => {
        const codeList = convertArrayToObject(data, 'codelistType');
        return R.map(({codelistItems}) => {
            return R.map((codelistItem) => {
                return {
                    ...codelistItem,
                    key: codelistItem.code,
                    value: codelistItem.code,
                    label: codelistItem.description,
                };
            }, codelistItems);
        }, codeList);
    }

    public transformSuppliers = (suppliers: ISupplier[]) => {
        return R.map(supplier => {
            return {
                ...supplier,
                key: supplier.id,
                value: supplier.id,
                label: supplier.name,
            };
        }, suppliers);
    }
}
