import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import {
    confirmFindNewSupplyPoint,
    confirmFindNewSupplyPointConfig,
    supplyPointDetailAllowedFields,
} from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import {
    CODE_LIST_TYPES,
    CONSTS,
    CONTRACT_END_TYPE,
    CONTRACT_END_TYPE_TRANSLATE_MAP,
    ROUTES,
    SUBJECT_TYPE_OPTIONS,
    TIME_TO_CONTRACT_END_PERIOD_MAP,
} from 'src/app/app.constants';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { transformCodeList } from 'src/common/utils';

@Component({
    selector: 'pxe-supply-point-detail-form',
    templateUrl: './supply-point-detail-form.component.html',
    styleUrls: ['./supply-point-detail-form.component.scss'],
})
export class SupplyPointDetailFormComponent extends AbstractSupplyPointFormComponent implements OnInit, OnChanges {
    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public contractActionsTemplate: TemplateRef<any>;

    public allowedFields = supplyPointDetailAllowedFields;
    public allowedOperations = AllowedOperations;
    public commodityType = CommodityType;
    public codeLists: ICodelistOptions;
    public contractEndType = CONTRACT_END_TYPE;
    public contractEndTypeTranslateMap = CONTRACT_END_TYPE_TRANSLATE_MAP;
    public suppliers = [];
    public subjectName = '';
    public supplyPointContractEndType = CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION;
    public setFormByCommodity = this.setFormFields;
    public timeToContractEndPeriodMap = TIME_TO_CONTRACT_END_PERIOD_MAP;
    public today = new Date().toISOString();
    public timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_PROLONGED;
    public timeToContractEndPeriod = TimeToContractEndPeriod.DAY;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        protected fb: FormBuilder,
        private modalsService: ModalService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.setFormByCommodity(this.commodityType[this.supplyPoint.commodityType]);
        this.subjectName = R.find(R.propEq('value', this.supplyPoint.subject.code))(SUBJECT_TYPE_OPTIONS).label;
        this.prefillFormData();

        this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
                this.codeLists = transformCodeList(data.findCodelistsByTypes);
                this.setAnnualConsumptionNTState(
                    this.supplyPoint.distributionRate && this.supplyPoint.distributionRate.code,
                    this.codeLists,
                );
                this.cd.markForCheck();
            });

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed),
            )
            .subscribe(modal => {
                if (modal.modalType === confirmFindNewSupplyPoint) {
                    this.navigateToSupplyPoint(modal.data);
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes.formSent && changes.formSent.currentValue === true) {
            this.setOriginalFormValues(this.form.value);
        }
    }

    public findNewSupplier = (supplyPoint: ISupplyPoint) => {
        const isDifferentForm = this.isDifferentForm();
        if (isDifferentForm) {
            this.modalsService
                .showModal$.next(confirmFindNewSupplyPointConfig(supplyPoint));
        } else {
            this.navigateToSupplyPoint(supplyPoint);
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

    public prefillFormData = () => {
        let id = null;
        let commodityType = null;
        let name = null;
        let annualConsumptionNT = null;
        let annualConsumptionVT = null;
        let annualConsumption = null;

        if (!R.isEmpty(this.supplyPoint)) {
            id = this.supplyPoint.id;
            commodityType = this.supplyPoint.commodityType;
            name = this.supplyPoint.name;
            annualConsumptionVT = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
            annualConsumptionNT = this.supplyPoint.annualConsumptionNT &&
                this.supplyPoint.annualConsumptionNT.toString().replace('.', ',');
            annualConsumption = this.supplyPoint.annualConsumptionVT &&
                this.supplyPoint.annualConsumptionVT.toString().replace('.', ',');
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

    public submitValidForm = () => {
        const form: any = {
            ...this.form.value,
        };
        if (!R.isNil(this.form.value.annualConsumptionNT)) {
            form.annualConsumptionNT = parseFloat(this.form.value.annualConsumptionNT.toString().replace(',', '.'));
        }
        if (!R.isNil(this.form.value.annualConsumptionVT)) {
            form.annualConsumptionVT = parseFloat(this.form.value.annualConsumptionVT.toString().replace(',', '.'));
        }
        if (!R.isNil(this.form.value.annualConsumption)) {
            form.annualConsumption = parseFloat(this.form.value.annualConsumption.toString().replace(',', '.'));
        }
        this.submitAction.emit(form);
    }
}
