import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractSupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/abstract-supply-point-form.component';
import {
    AllowedOperations,
    CommodityType,
    ICodelistOptions,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    ANNUAL_CONSUMPTION_TYPES,
    ANNUAL_CONSUMPTION_UNIT_TYPES,
    CODE_LIST,
    CODE_LIST_TYPES,
    CONSTS,
    CONTRACT_END_TYPE,
    CONTRACT_END_TYPE_TRANSLATE_MAP,
    ROUTES,
    SUBJECT_TYPE_OPTIONS,
    UNIT_OF_PRICES,
} from 'src/app/app.constants';
import {
    confirmConfirmSaveSupplyPointConfig,
    confirmFindNewSupplyPoint,
    confirmFindNewSupplyPointConfig,
    confirmSaveSupplyPoint,
    supplyPointDetailAllowedFields,
} from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { DocumentService } from 'src/app/services/document.service';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import {
    parseRestAPIErrors,
    transformCodeList,
} from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ContractStatus } from 'src/common/graphql/models/contract';

@Component({
    selector: 'pxe-supply-point-detail-form',
    templateUrl: './supply-point-detail-form.component.html',
    styleUrls: ['./supply-point-detail-form.component.scss'],
})
export class SupplyPointDetailFormComponent extends AbstractSupplyPointFormComponent implements OnInit, OnChanges {
    public fileLoading = false;

    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public nextSupplyPoint?: ISupplyPoint = null;

    @Input()
    public contractActionsTemplate?: TemplateRef<any>;

    @Input()
    public isForm = true;

    @Output()
    public finallyNextContractAction?: EventEmitter<any> = new EventEmitter<any>();

    public allowedFields = supplyPointDetailAllowedFields;
    public allowedOperations = AllowedOperations;
    public commodityType = CommodityType;
    public codeList = CODE_LIST;
    public codeLists: ICodelistOptions;
    public contractEndType = CONTRACT_END_TYPE;
    public ContractStatus = ContractStatus;
    public contractEndTypeTranslateMap = CONTRACT_END_TYPE_TRANSLATE_MAP;
    public suppliers = [];
    public subjectName = '';
    public supplyPointContractEndTypes = CONTRACT_END_TYPE;
    public setFormByCommodity = this.setFormFields;
    public today = moment().startOf('days');
    public timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private documentService: DocumentService,
        protected fb: FormBuilder,
        private modalsService: ModalService,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super(fb);
    }

    ngOnInit() {
        if (this.isForm) {
            super.ngOnInit();
            this.setFormByCommodity(this.commodityType[this.supplyPoint.commodityType]);
            this.subjectName = R.find(R.propEq('value', this.supplyPoint.subject.code))(SUBJECT_TYPE_OPTIONS).label;

            this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
                .pipe(takeUntil(this.destroy$))
                .subscribe(({data}) => {
                    this.codeLists = transformCodeList(data.findCodelistsByTypes);
                    this.setAnnualConsumptionNTState(
                        this.supplyPoint.distributionRate && this.supplyPoint.distributionRate.code,
                        this.codeLists,
                    );
                    this.prefillFormData();
                    this.cd.markForCheck();
                });

            this.form.get('annualConsumptionNTUnit')
                .valueChanges
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe((annualConsumptionNTUnit: UNIT_OF_PRICES) => {
                    this.detectChangesForAnnualConsumption(
                        ANNUAL_CONSUMPTION_TYPES.ANNUAL_CONSUMPTION_NT,
                        ANNUAL_CONSUMPTION_UNIT_TYPES.ANNUAL_CONSUMPTION_NT_UNIT,
                        annualConsumptionNTUnit,
                    );
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
                    );
                });

            this.modalsService.closeModalData$
                .pipe(
                    takeUntil(this.destroy$),
                    filter(R_.isNotNil),
                    filter((modal: ICloseModalData) => modal.confirmed),
                )
                .subscribe(modal => {
                    if (modal.modalType === confirmFindNewSupplyPoint) {
                        this.navigateToSupplyPoint(modal.data);
                    }

                    if (modal.modalType === confirmSaveSupplyPoint) {
                        this.saveSubmittedData();
                    }

                    this.modalsService.closeModalData$.next(null);
                });
        } else {
            this.fixAnnualConsumptionByUnit();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isForm) {
            super.ngOnChanges(changes);

            if (changes.formSent && changes.formSent.currentValue === true) {
                this.setOriginalFormValues(this.form.value);
            }
        }
    }

    public findNewSupplier = () => {
        const isDifferentForm = this.isDifferentForm();
        if (isDifferentForm) {
            this.modalsService
                .showModal$.next(confirmFindNewSupplyPointConfig(this.supplyPoint));
        } else {
            this.navigateToSupplyPoint(this.supplyPoint);
        }
    }

    public navigateToSupplyPoint = (supplyPoint: ISupplyPoint) => {
        const state = {
            supplyPointCopy: {
                ...supplyPoint,
            },
        };
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT], {state});
    }

    public fixAnnualConsumptionByUnit = () => {
        const annualConsumptionUnit = this.supplyPoint.annualConsumptionUnit;
        const annualConsumptionNTUnit = this.supplyPoint.annualConsumptionNTUnit;
        const annualConsumptionVTUnit = this.supplyPoint.annualConsumptionVTUnit;
        if (annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
            this.supplyPoint.annualConsumption *= 1000;
        }

        if (annualConsumptionVTUnit === UNIT_OF_PRICES.KWH) {
            this.supplyPoint.annualConsumptionVT *= 1000;
        }

        if (annualConsumptionNTUnit === UNIT_OF_PRICES.KWH) {
            this.supplyPoint.annualConsumptionNT *= 1000;
        }
    }

    public prefillFormData = () => {
        let id = null;
        let commodityType = null;
        let name = null;
        let annualConsumptionUnit = null;
        let annualConsumptionNTUnit = null;
        let annualConsumptionVTUnit = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;

        if (!R.isEmpty(this.supplyPoint)) {
            id = this.supplyPoint.id;
            commodityType = this.supplyPoint.commodityType;
            name = this.supplyPoint.name;
            annualConsumptionUnit = this.supplyPoint.annualConsumptionUnit;
            annualConsumptionNTUnit = this.supplyPoint.annualConsumptionNTUnit;
            annualConsumptionVTUnit = this.supplyPoint.annualConsumptionVTUnit;
            annualConsumptionVT = this.supplyPoint.annualConsumptionVT;
            annualConsumptionNT = this.supplyPoint.annualConsumptionNT;
            annualConsumption = this.supplyPoint.annualConsumption;

            if (annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
                annualConsumption *= 1000;
            }

            if (annualConsumptionVTUnit === UNIT_OF_PRICES.KWH) {
                annualConsumptionVT *= 1000;
            }

            if (annualConsumptionNTUnit === UNIT_OF_PRICES.KWH) {
                annualConsumptionNT *= 1000;
            }

            annualConsumptionNT = this.normalizationAnnualConsumption(annualConsumptionNT);
            annualConsumptionVT = this.normalizationAnnualConsumption(annualConsumptionVT);
            annualConsumption = this.normalizationAnnualConsumption(annualConsumption);

            this.form.controls['annualConsumptionNTUnit'].setValue(annualConsumptionNTUnit);
            this.form.controls['annualConsumptionVTUnit'].setValue(annualConsumptionVTUnit);
            this.form.controls['annualConsumptionUnit'].setValue(annualConsumptionUnit);
        }

        this.form.controls['id'].setValue(id);
        this.form.controls['commodityType'].setValue(commodityType);
        this.form.controls['name'].setValue(name);
        this.form.controls['annualConsumptionVT'].setValue(annualConsumptionVT);
        this.form.controls['annualConsumptionNT'].setValue(annualConsumptionNT);
        this.form.controls['annualConsumption'].setValue(annualConsumption);

        this.setOriginalFormValues(this.form.value);
        this.resetFormError(false);
    }

    public submitValidForm = () => this.modalsService
        .showModal$.next(confirmConfirmSaveSupplyPointConfig())

    private saveSubmittedData = () => {
        const form: any = {
            ...this.form.value,
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

    public downloadPdf = () => {
        this.formLoading = true;
        this.documentService.getDocument(this.supplyPoint.contract.contractId, IDocumentType.CONTRACT)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.documentService.documentSave(responseDataDocument);
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.globalError = [message];
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
            );
    }
}
