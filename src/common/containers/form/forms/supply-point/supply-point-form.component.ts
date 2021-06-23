import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import {
    filter,
    map,
    pairwise,
    startWith,
    takeUntil,
} from 'rxjs/operators';

import { AbstractSupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/abstract-supply-point-form.component';
import { AddressWhispererComponent } from 'src/common/containers/address-whisperer/address-whisperer.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    ANNUAL_CONSUMPTION_TYPES,
    ANNUAL_CONSUMPTION_UNIT_TYPES,
    CODE_LIST,
    CODE_LIST_TYPES,
    COMMODITY_TYPE_OPTIONS,
    CONSTS,
    CONTRACT_END_TYPE,
    CONTRACT_END_TYPE_ORDER,
    OWN_TERMINATE_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
    SUBJECT_TYPE_TO_DIST_RATE_MAP,
    SUPPLY_POINT_EDIT_TYPE,
    UNIT_OF_PRICES,
} from 'src/app/app.constants';
import {
    CommodityType,
    ICodelistItem,
    ISupplierSampleDocument,
    ISupplyPoint,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import {
    convertArrayToObject,
    transformCodeList,
    transformSuppliers,
} from 'src/common/utils';
import { convertDateToSendFormatFnc } from 'src/common/utils/standalone/convert-date-to-send-format.fnc';
import {
    expirationConfig,
    supplyPointAllowedFields,
} from './supply-point-form.config';
import { HelpModalComponent } from 'src/common/containers/modal/modals/help/help-modal.component';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SupplyPointLocalStorageService } from 'src/app/services/supply-point-local-storage.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
})
export class SupplyPointFormComponent extends AbstractSupplyPointFormComponent implements OnInit, OnDestroy, OnChanges {
    private readonly FIELDS_FOR_RESET_EXPIRATION_DATE = [
        'ownTerminate',
        'contractEndTypeId',
        'expirationDate',
        'timeToContractEndPeriodId',
    ];

    public readonly MAX_LENGTH_NUMBER_INPUT_WITH_HINT = CONSTS.VALIDATORS.MAX_LENGTH.NUMBER_INPUT_WITH_HINT;
    public pxeAddressWhisperer: AddressWhispererComponent;

    @ViewChild('pxeAddressWhisperer')
    set addressWhisperer(pxeAddressWhisperer: AddressWhispererComponent) {
        if (pxeAddressWhisperer) {
            this.pxeAddressWhisperer = pxeAddressWhisperer;
        }
    }

    @Input()
    public formValues: ISupplyPoint  = null;

    @Input()
    public withoutValidator = false;

    @Input()
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;

    @Input()
    public submitLabel = 'Uložit a zobrazit nabídky';

    public allowedFields = supplyPointAllowedFields;
    public codeList = CODE_LIST;
    public codeLists;
    public codeLists$: BehaviorSubject<any> = new BehaviorSubject([]);
    public commodityType = CommodityType.POWER;
    public CommodityTypes = CommodityType;
    public commodityTypeOptions: Array<IOption> = COMMODITY_TYPE_OPTIONS;
    public ownTerminateOptions: Array<IOption> = OWN_TERMINATE_OPTIONS;
    public contractEndType = CONTRACT_END_TYPE.CONTRACT_END_DEFAULT;
    public distributionRateType: string = CODE_LIST.DIST_RATE_INDIVIDUAL;
    public existsPartialSupplyPointValue = null;
    public expirationConfig = expirationConfig;
    public formWasPrefilled = false;
    public helpDocuments = {};
    public minDate: Date;
    public subjectTypeOptions: Array<IOption> = SUBJECT_TYPE_OPTIONS;
    public suppliers = [];
    public suppliers$: BehaviorSubject<any> = new BehaviorSubject([]);

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
        private modalsService: ModalService,
        public sAnalyticsService: SAnalyticsService,
        private supplyPointLocalStorageService: SupplyPointLocalStorageService,
        private supplyService: SupplyService,
    ) {
        super(fb);
        this.minDate = moment().add(this.CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS, 'day').toDate();
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls, this.formFields.options);
        this.sAnalyticsService.sFormStart();

        this.form.get('annualConsumptionNTUnit')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                startWith(UNIT_OF_PRICES.KWH),
                pairwise(),
                filter(([prevAnnualConsumptionNTUnit, annualConsumptionNTUnit]) => prevAnnualConsumptionNTUnit !== annualConsumptionNTUnit),
            )
            .subscribe(([_, annualConsumptionNTUnit]) => {
                this.detectChangesForAnnualConsumption(
                    ANNUAL_CONSUMPTION_TYPES.ANNUAL_CONSUMPTION_NT,
                    ANNUAL_CONSUMPTION_UNIT_TYPES.ANNUAL_CONSUMPTION_NT_UNIT,
                    annualConsumptionNTUnit,
                    this.withoutValidator,
                );
            });

        this.form
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                pairwise(),
            )
            .subscribe(([prev, current]) => {
                R.forEach(
                    fieldName => {
                        if (prev[fieldName] !== current[fieldName]) {
                            if (R.path([fieldName, 'notEnoughDaysToProcessContract'])(this.formError)) {
                                this.resetFormError(true);
                            }
                        }
                    },
                )(this.FIELDS_FOR_RESET_EXPIRATION_DATE);
            });

        this.form.get('annualConsumptionUnit')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((annualConsumptionUnit: UNIT_OF_PRICES) => {
                this.detectChangesForAnnualConsumption(
                    ANNUAL_CONSUMPTION_TYPES.ANNUAL_CONSUMPTION,
                    ANNUAL_CONSUMPTION_UNIT_TYPES.ANNUAL_CONSUMPTION_UNIT,
                    annualConsumptionUnit,
                    this.withoutValidator,
                );
            });

        this.form.get('annualConsumptionVTUnit')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((annualConsumptionVTUnit: UNIT_OF_PRICES) => {
                this.detectChangesForAnnualConsumption(
                    ANNUAL_CONSUMPTION_TYPES.ANNUAL_CONSUMPTION_VT,
                    ANNUAL_CONSUMPTION_UNIT_TYPES.ANNUAL_CONSUMPTION_VT_UNIT,
                    annualConsumptionVTUnit,
                    this.withoutValidator,
                );
            });

        this.form.get('commodityType')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((commodityType: CommodityType) => {
                this.commodityType = commodityType;
                this.resetFormError(false);
                this.setFormByCommodity(commodityType);
                this.resetFieldValue('supplierId', false);
                const distributionRateId = commodityType === CommodityType.POWER ? this.getFieldValue('distributionRateId') : null;
                this.setAnnualConsumptionNTState(distributionRateId, this.codeLists);
                this.setOwnTerminate(this.form.get('ownTerminate').value);
            });

        this.form.get('subjectTypeId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((val: string) => {
                this.resetFieldValue('distributionRateId', false);
                this.distributionRateType = SUBJECT_TYPE_TO_DIST_RATE_MAP[val];
                this.cd.markForCheck();
            });


        this.form.get('ownTerminate')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((ownTerminate: boolean) => {
                this.setOwnTerminate(ownTerminate);
                this.cd.markForCheck();
            });

        this.form.get('distributionRateId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.setAnnualConsumptionNTState(val, this.codeLists);
            });

        this.form.get('contractEndTypeId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((contractEndTypeId) => {
                if (contractEndTypeId) {
                    this.setContractEndFields();
                }
            });

        this.form.get('supplierId')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.helpDocuments = val && val.sampleDocuments ?
                    convertArrayToObject(
                        val.sampleDocuments,
                        'type',
                        (sampleDocument: ISupplierSampleDocument) => sampleDocument.commodityType === this.commodityType,
                    ) : {};
            });

        this.setFormByCommodity(this.formValues && this.formValues.commodityType);
        this.setContractEndFields();
        this.loadCodeLists();

        combineLatest([
            this.suppliers$,
            this.codeLists$,
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([suppliers, codeLists]) => {
                if (!R.isEmpty(suppliers) && !R.isEmpty(codeLists)) {
                    if (this.formValues && !this.formWasPrefilled) {
                        this.prefillForm();
                        this.formWasPrefilled = true;
                    } else {
                        if (R.isNil(this.existsPartialSupplyPointValue)) {
                            const partialSupplyPoint = this.supplyPointLocalStorageService.getSupplyPoint();
                            this.existsPartialSupplyPointValue =
                                partialSupplyPoint &&
                                !R.isEmpty(partialSupplyPoint) &&
                                partialSupplyPoint.email === this.authService.currentUserValue.email;
                        }

                        this.form
                            .valueChanges
                            .pipe(
                                takeUntil(this.destroy$),
                                filter(_ => !this.existsPartialSupplyPointValue && R.empty(this.formValues)),
                            )
                            .subscribe(_ => {
                                const formValues = this.form.getRawValue();
                                this.supplyPointLocalStorageService.updateSupplyPoint(formValues);
                            });

                        this.supplyPointLocalStorageService.getSupplyPointStream()
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(formValues => {
                                try {
                                    // tslint:disable-next-line
                                    let { email, supplyPointForm } = formValues;
                                    this.resetFormError(false);
                                    if (email === this.authService.currentUserValue.email) {
                                        if (supplyPointForm.expirationDate) {
                                            supplyPointForm.expirationDate = new Date(supplyPointForm.expirationDate);
                                        }
                                        const setPartialFormForAddress =
                                            AddressWhispererComponent.getAddressNotFoundUniqueValue(supplyPointForm);
                                        supplyPointForm =
                                            AddressWhispererComponent.removeAddressNotFoundUnique(supplyPointForm);
                                        this.form.setValue(supplyPointForm);
                                        if (setPartialFormForAddress) {
                                            this.pxeAddressWhisperer.changeSelectedValue(setPartialFormForAddress);
                                        }
                                        this.resetFormError(false);
                                    }
                                    this.existsPartialSupplyPointValue = false;
                                    this.supplyPointLocalStorageService.removeSupplyPoint();
                                } catch (e) {}
                            });

                        this.supplyPointLocalStorageService.removeSupplyPointStream()
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(formValue => {
                                this.existsPartialSupplyPointValue = false;
                            });
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
        let contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD;
        let timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_INDEFINITE_TIME_IN_MONTHS;
        let timeToContractEndPeriodId: ICodelistItem | string = TimeToContractEndPeriod.MONTH;
        let annualConsumptionNTUnit = null;
        let annualConsumptionVTUnit = null;
        let annualConsumptionUnit = null;

        if (!R.isEmpty(this.formValues)) {
            commodityType = this.formValues.commodityType;
            const supplier = R.find(R.propEq('id', this.formValues.supplier?.id))(this.suppliers[commodityType]);
            const expirationDateFromSupplyPoint = this.formValues.expirationDate && new Date(this.formValues.expirationDate);
            const expirationDateFromContract = this.formValues.contract &&
                this.formValues?.contract.deliveryTo &&
                new Date(this.formValues?.contract.deliveryTo);
            id = this.formValues.id;
            subjectTypeId = this.formValues.subject && this.formValues.subject?.code;
            supplierId = this.formValues.supplier && this.suppliers[commodityType] && supplier;
            name = this.formValues.name;
            ean = this.formValues.commodityType === CommodityType.POWER ? this.formValues.identificationNumber : null;
            eic = this.formValues.commodityType === CommodityType.GAS ? this.formValues.identificationNumber : null;
            address = this.formValues?.address?.city && R.omit(['__typename'], this.formValues.address);
            distributionRateId = this.formValues?.distributionRate && this.formValues.distributionRate.code;
            circuitBreakerId = this.formValues?.circuitBreaker && this.formValues.circuitBreaker.code;
            phasesId = this.formValues?.phases && this.formValues.phases.code;
            annualConsumptionNTUnit = this.formValues.annualConsumptionNTUnit;
            annualConsumptionVTUnit = this.formValues.annualConsumptionVTUnit;
            annualConsumptionUnit = this.formValues.annualConsumptionUnit;
            annualConsumptionVT = this.formValues.annualConsumptionVT;
            annualConsumptionNT = this.formValues.annualConsumptionNT;
            annualConsumption = this.formValues.annualConsumption;

            if (annualConsumptionVT && annualConsumptionVTUnit === UNIT_OF_PRICES.KWH) {
                annualConsumptionVT *= 1000;
            }

            if (annualConsumptionNT && annualConsumptionNTUnit === UNIT_OF_PRICES.KWH) {
                annualConsumptionNT *= 1000;
            }

            if (annualConsumption && annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
                annualConsumption *= 1000;
            }

            annualConsumptionNT = this.normalizationAnnualConsumption(annualConsumptionNT);
            annualConsumptionVT = this.normalizationAnnualConsumption(annualConsumptionVT);
            annualConsumption = this.normalizationAnnualConsumption(annualConsumption);

            if (this.editMode === SUPPLY_POINT_EDIT_TYPE.NORMAL) {
                expirationDate = expirationDateFromSupplyPoint;
                contractEndTypeId = this.formValues?.contractEndType && this.formValues.contractEndType.code;
                timeToContractEnd = this.formValues?.timeToContractEnd;
                timeToContractEndPeriodId = this.formValues?.timeToContractEndPeriod && this.formValues.timeToContractEndPeriod.code;
            } else {
                expirationDate = expirationDateFromContract || expirationDateFromSupplyPoint;
                contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION;
                timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS;
                timeToContractEndPeriodId = TimeToContractEndPeriod.DAY;
            }

            if (annualConsumptionNTUnit) {
                this.form.controls['annualConsumptionNTUnit'].setValue(annualConsumptionNTUnit);
            }

            if (annualConsumptionVTUnit) {
                this.form.controls['annualConsumptionVTUnit'].setValue(annualConsumptionVTUnit);
            }

            if (annualConsumptionUnit) {
                this.form.controls['annualConsumptionUnit'].setValue(annualConsumptionUnit);
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
            supplierId: this.form.value.supplierId && this.form.value.supplierId.id,
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
        if (form.annualConsumptionVTUnit === UNIT_OF_PRICES.KWH) {
            form.annualConsumptionVT = form.annualConsumptionVT / 1000;
        }
        if (form.annualConsumptionNTUnit === UNIT_OF_PRICES.KWH) {
            form.annualConsumptionNT = form.annualConsumptionNT / 1000;
        }
        if (form.annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
            form.annualConsumption = form.annualConsumption / 1000;
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

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
