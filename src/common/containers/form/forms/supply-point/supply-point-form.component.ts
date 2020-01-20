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
import * as R_ from 'ramda-extension';
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractSupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/abstract-supply-point-form.component';
import {
    CODE_LIST,
    CODE_LIST_TYPES,
    COMMODITY_TYPE_OPTIONS,
    CONSTS,
    CONTRACT_END_TYPE,
    CONTRACT_END_TYPE_ORDER,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
    SUPPLY_POINT_EDIT_TYPE,
} from 'src/app/app.constants';
import {
    CommodityType,
    ISupplyPoint,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import {
    convertArrayToObject,
    convertDateToSendFormatFnc,
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
    public readonly MAX_LENGTH_NUMBER_INPUT_WITH_HINT = CONSTS.VALIDATORS.MAX_LENGTH.NUMBER_INPUT_WITH_HINT;

    @Input()
    public formValues: ISupplyPoint = null;

    @Input()
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;

    public allowedFields = supplyPointAllowedFields;
    public codeList = CODE_LIST;
    public codeLists;
    public codeLists$: BehaviorSubject<any> = new BehaviorSubject([]);
    public commodityTypeOptions: Array<IOption> = COMMODITY_TYPE_OPTIONS;
    public distributionRateType: string = CODE_LIST.DIST_RATE_INDIVIDUAL;
    public expirationConfig = expirationConfig;
    public formWasPrefilled = false;
    public helpDocuments = {};
    public minDate: Date;
    public subjectTypeOptions: Array<IOption> = SUBJECT_TYPE_OPTIONS;
    public suppliers = [];
    public suppliers$: BehaviorSubject<any> = new BehaviorSubject([]);
    public contractEndType = CONTRACT_END_TYPE.CONTRACT_END_DEFAULT;

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
        this.form = this.fb.group(this.formFields.controls, this.formFields.options);

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
                this.setOwnTerminate(this.form.get('ownTerminate').value);
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


        this.form.get('ownTerminate')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((ownTerminate: boolean) => {
                this.setOwnTerminate(ownTerminate);
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
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((contractEndTypeId) => {
                if (contractEndTypeId) {
                    this.setContractEndFields();
                }
            });

        this.form.get('supplierId')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(val => {
                this.helpDocuments = val && val.sampleDocuments ? convertArrayToObject(val.sampleDocuments, 'type') : {};
            });

        this.setFormByCommodity(this.formValues && this.formValues.commodityType);
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
                    if (this.formValues && !this.formWasPrefilled) {
                        this.prefillForm();
                        this.formWasPrefilled = true;
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
        let subjectTypeId: string = SubjectType.SUBJECT_TYPE_INDIVIDUAL;
        let supplierId = null;
        let name = null;
        let ean = null;
        let eic = null;
        let address = null;
        let distributionRateId = null;
        let circuitBreakerId = null;
        let phasesId = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;
        let expirationDate = null;
        let contractEndTypeId = null;
        let timeToContractEnd = null;
        let timeToContractEndPeriodId = null;

        if (!R.isEmpty(this.formValues)) {
            commodityType = this.formValues.commodityType;
            const supplier = R.find(R.propEq('id', this.formValues.supplier.id))(this.suppliers[commodityType]);
            const expirationDateFromSupplyPoint = this.formValues.expirationDate && new Date(this.formValues.expirationDate);
            const expirationDateFromContract = this.formValues.contract &&
                this.formValues.contract.deliveryTo &&
                new Date(this.formValues.contract.deliveryTo);
            id = this.formValues.id;
            subjectTypeId = this.formValues.subject && this.formValues.subject.code;
            supplierId = this.formValues.supplier && this.suppliers[commodityType] && supplier;
            name = this.formValues.name;
            ean = this.formValues.commodityType === CommodityType.POWER ? this.formValues.ean : null;
            eic = this.formValues.commodityType === CommodityType.GAS ? this.formValues.ean : null;
            address = this.formValues.address && R.omit(['__typename'], this.formValues.address);
            distributionRateId = this.formValues.distributionRate && this.formValues.distributionRate.code;
            circuitBreakerId = this.formValues.circuitBreaker && this.formValues.circuitBreaker.code;
            phasesId = this.formValues.phases && this.formValues.phases.code;
            annualConsumptionNT = this.formValues.annualConsumptionNT && this.formValues.annualConsumptionNT.toString().replace('.', ',');
            annualConsumptionVT = this.formValues.annualConsumptionVT && this.formValues.annualConsumptionVT.toString().replace('.', ',');
            annualConsumption = this.formValues.annualConsumptionVT && this.formValues.annualConsumptionVT.toString().replace('.', ',');
            if (this.editMode === SUPPLY_POINT_EDIT_TYPE.NORMAL) {
                expirationDate = expirationDateFromSupplyPoint;
                contractEndTypeId = this.formValues.contractEndType && this.formValues.contractEndType.code;
                timeToContractEnd = this.formValues.timeToContractEnd;
                timeToContractEndPeriodId = this.formValues.timeToContractEndPeriod && this.formValues.timeToContractEndPeriod.code;
            } else {
                expirationDate = expirationDateFromContract || expirationDateFromSupplyPoint;
                contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION;
                timeToContractEnd = String(CONSTS.TIME_TO_CONTRACT_END_PROLONGED);
                timeToContractEndPeriodId = TimeToContractEndPeriod.DAY;
            }
        }

        const filteredContractEndTypeId = contractEndTypeId === CONTRACT_END_TYPE.CONTRACT_END_TERMINATE ? null : contractEndTypeId;

        this.form.controls['id'].setValue(id);
        this.form.controls['commodityType'].setValue(commodityType);
        this.form.controls['subjectTypeId'].setValue(subjectTypeId);
        this.form.controls['supplierId'].setValue(supplierId);
        this.form.controls['name'].setValue(name);
        this.form.controls['ean'].setValue(ean);
        this.form.controls['eic'].setValue(eic);
        this.form.controls['address'].setValue(address);
        this.form.controls['distributionRateId'].setValue(distributionRateId);
        this.form.controls['circuitBreakerId'].setValue(circuitBreakerId);
        this.form.controls['phasesId'].setValue(phasesId);
        this.form.controls['annualConsumptionNT'].setValue(annualConsumptionNT);
        this.form.controls['annualConsumptionVT'].setValue(annualConsumptionVT);
        this.form.controls['annualConsumption'].setValue(annualConsumption);
        this.form.controls['expirationDate'].setValue(expirationDate);
        this.form.controls['contractEndTypeId'].setValue(filteredContractEndTypeId);
        this.form.controls['timeToContractEnd'].setValue(timeToContractEnd);
        this.form.controls['timeToContractEndPeriodId'].setValue(timeToContractEndPeriodId);

        if (contractEndTypeId === CONTRACT_END_TYPE.CONTRACT_END_TERMINATE) {
            this.form.controls['ownTerminate'].setValue(true);
        }
    }

    public setContractEndFields = (type = null) => {
        const contractEndType = this.getFieldValue('contractEndTypeId') || type;
        if (this.form.get('ownTerminate').value) {
            this.contractEndType = CONTRACT_END_TYPE.CONTRACT_END_TERMINATE;
        } else if (contractEndType) {
            this.contractEndType = contractEndType;
        } else {
            this.contractEndType = CONTRACT_END_TYPE.CONTRACT_END_DEFAULT;
        }

        R.forEachObjIndexed((show: boolean, field: string) => {
            show ? this.setEnableField(field) : this.setDisableField(field);
        }, this.expirationConfig[this.contractEndType]);

        this.cd.markForCheck();
    }

    public setFormByCommodity = (commodityType: CommodityType = CommodityType.POWER) => {
        this.setFormFields(commodityType);
        this.loadSuppliers(commodityType);
    }

    public submitValidForm = () => {
        const form = {
            ...this.form.value,
            supplierId: this.form.value.supplierId && parseInt(this.form.value.supplierId.id, 10),
            expirationDate: this.form.value.expirationDate && convertDateToSendFormatFnc(this.form.value.expirationDate),
        };
        if (!R.isNil(form.annualConsumptionNT)) {
            form.annualConsumptionNT = parseFloat(form.annualConsumptionNT.toString().replace(',', '.'));
        }
        if (!R.isNil(form.annualConsumptionVT)) {
            form.annualConsumptionVT = parseFloat(form.annualConsumptionVT.toString().replace(',', '.'));
        }
        if (!R.isNil(form.annualConsumption)) {
            form.annualConsumption = parseFloat(form.annualConsumption.toString().replace(',', '.'));
        }
        if (this.contractEndType === CONTRACT_END_TYPE.CONTRACT_END_TERMINATE) {
            form.contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_TERMINATE;
        }

        this.submitAction.emit(form);
    }

    public setOwnTerminate = (ownTerminate: boolean) => {
        if (ownTerminate) {
            this.setDisableField('contractEndTypeId');
            this.setContractEndFields(CONTRACT_END_TYPE.CONTRACT_END_TERMINATE);
        } else {
            this.setEnableField('contractEndTypeId');
            this.setContractEndFields();
            this.resetFieldError('contractEndTypeId', true);
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
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.findCodelistsByTypes),
                map(this.removeTerminateFromContractEndType),
            )
            .subscribe(data => {
                this.codeLists = transformCodeList(data);
                this.codeLists$.next(this.codeLists);
                this.cd.markForCheck();
            });
    }

    public removeTerminateFromContractEndType = (codeLists) => {
        const sortEndOfContract = (a, b) => {
            return CONTRACT_END_TYPE_ORDER.indexOf(a.code) - CONTRACT_END_TYPE_ORDER.indexOf(b.code);
        };
        const updatedContractEnding = R.pipe(
            R.find(R.propEq('codelistType', CODE_LIST.CONTRACT_END_TYPE)),
            R.map(
                R.cond([
                    [
                        R_.isArray,
                        R.pipe(
                            R.filter(({code}) => code !== CONTRACT_END_TYPE.CONTRACT_END_TERMINATE),
                            R.sort(sortEndOfContract),
                        ),
                    ],
                    [
                        R.T,
                        (data) => data,
                    ],
                ]),
            ),
        )(codeLists);

        return [...codeLists, updatedContractEnding];
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

