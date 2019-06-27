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
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractSupplyPointFormComponent } from './abstract-supply-point-form.component';
import {
    CODE_LIST,
    CODE_LIST_TYPES,
    COMMODITY_TYPE_OPTIONS,
    CONTRACT_END_TYPE,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
} from 'src/app/app.constants';
import {
    CommodityType,
    ISupplyPoint,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import {
    convertArrayToObject,
    transformCodeList,
    transformSuppliers,
} from 'src/common/utils';
import {
    expirationConfig,
    supplyPointAllowedFields,
} from './supply-point-form.config';
import { HelpModalComponent } from 'src/common/containers/modal/modals/help/help-modal.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
})
export class SupplyPointFormComponent extends AbstractSupplyPointFormComponent implements OnInit, OnChanges {
    @Input()
    public formValues: ISupplyPoint = null;

    public allowedFields = supplyPointAllowedFields;
    public commodityTypeOptions: Array<IOption> = COMMODITY_TYPE_OPTIONS;
    public subjectTypeOptions: Array<IOption> = SUBJECT_TYPE_OPTIONS;
    public codeLists;
    public codeList = CODE_LIST;
    public helpDocuments = {};
    public minDate: Date;
    public suppliers = [];
    public distributionRateType: string = CODE_LIST.DIST_RATE_INDIVIDUAL;
    public expirationConfig = expirationConfig;

    public codeLists$: BehaviorSubject<any> = new BehaviorSubject([]);
    public suppliers$: BehaviorSubject<any> = new BehaviorSubject([]);

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
                this.resetFieldValue('supplierId', false);
                this.setAnnualConsumptionNTState(commodityType === CommodityType.POWER ? this.getFieldValue('distributionRateId') : null);
                this.setContractEndFields(this.getFieldValue('contractEndTypeId') || CONTRACT_END_TYPE.CONTRACT_END_DEFAULT);
            });

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId', false);
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
                this.setContractEndFields(val);
            });

        this.form.get('supplierId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(val => {
                this.helpDocuments = val && val.sampleDocuments ? convertArrayToObject(val.sampleDocuments, 'type') : {};
            });

        this.setFormByCommodity();
        this.setAnnualConsumptionNTState();
        this.setContractEndFields();
        this.loadCodeLists();

        combineLatest(
            this.suppliers$,
            this.codeLists$,
        )
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(([suppliers, codeLists]) => {
                if (!R.isEmpty(suppliers) && !R.isEmpty(codeLists)) {
                    console.log('%c ***** combineLatest *****', 'background: #bada55; color: #000; font-weight: bold',
                        suppliers, codeLists, this.formValues);
                    if (this.formValues) {
                        this.prefillForm();
                    }
                }
            });

    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public prefillForm = () => {
        let id = null;
        let commodityType = CommodityType.POWER;
        let subjectTypeId = SubjectType.SUBJECT_TYPE_INDIVIDUAL;
        let supplierId = null;
        let name = null;

        if (this.formValues) {
            id = this.formValues.id;
            commodityType = this.formValues.commodityType;
            subjectTypeId = this.formValues.subject && this.formValues.subject.code;
            const supplier = R.find(R.propEq('id', this.formValues.supplier.id))(this.suppliers[commodityType]);
            supplierId = this.formValues.supplier && supplier;
            name = this.formValues.name;
            console.log('%c ***** suppliers *****', 'background: #bada55; color: #000; font-weight: bold', supplier);
        }

        this.form.controls['id'].setValue(id);
        this.form.controls['id'].setValue(commodityType);
        this.form.controls['subjectTypeId'].setValue(subjectTypeId);
        this.form.controls['supplierId'].setValue(supplierId);
        this.form.controls['name'].setValue(name);
    }

    public setContractEndFields = (changeByContractEndType: string = CONTRACT_END_TYPE.CONTRACT_END_DEFAULT) => {
        const selectedContractEndType = this.expirationConfig[changeByContractEndType];

        R.forEachObjIndexed((show: boolean, field: string) => {
            show ? this.setEnableField(field) : this.setDisableField(field);
        }, selectedContractEndType);

        this.cd.markForCheck();
    }

    public setFormByCommodity = (commodityType: CommodityType = CommodityType.POWER) => {
        this.setFormFields(commodityType);
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
                this.codeLists$.next(this.codeLists);
                this.cd.markForCheck();
            });
    }

    public loadSuppliers = (commodityType) => {
        this.supplyService.getSuppliers(commodityType)
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.suppliers[commodityType] = transformSuppliers(data.findAllSuppliers);
                this.suppliers$.next(this.suppliers);
                this.cd.markForCheck();
            });
    }
}
