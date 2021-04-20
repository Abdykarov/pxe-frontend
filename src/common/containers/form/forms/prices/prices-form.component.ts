import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CommodityType,
    ICodelistOptions,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { includesBothTariffs } from 'src/common/utils';

@Component({
    selector: 'pxe-price-form',
    templateUrl: './prices-form.component.html',
    styleUrls: ['./prices-form.component.scss'],
})
export class PricesFormComponent extends AbstractFormComponent implements OnChanges {

    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public codeLists: ICodelistOptions;

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes && changes.supplyPoint) {
            setTimeout( _ => {
                this.prefillFormData();
                this.setForm();
                this.cd.markForCheck();
            });
        }
    }

    public setForm = () => {
        if (this.supplyPoint.commodityType === CommodityType.POWER) {
            this.setDisableField('importPricePerKwGas');
            this.setAnnualConsumptionNTState(this.supplyPoint.distributionRate.code, this.codeLists);
        } else {
            this.setDisableField('importPricePerKwPowerNT');
            this.setDisableField('importPricePerKwPowerVT');
        }
    }

    public setAnnualConsumptionNTState = (distributionRateId: string = null, codeLists: ICodelistOptions = null) => {
        if (distributionRateId && !includesBothTariffs(distributionRateId, codeLists)) {
            this.setDisableField('importPricePerKwPowerNT');
        }
    }

    public prefillFormData = () => {
        if (!this.form) {
            return;
        }
        let importPricePerKwGas = null;
        let importPricePerKwPowerNT = null;
        let importPricePerKwPowerVT = null;
        let importPriceTotalPerYear = null;
        let importPermanentMonthyPay = null;

        if (this.supplyPoint) {
            importPricePerKwGas = this.supplyPoint?.importPricePerKwGas;
            importPricePerKwPowerNT = this.supplyPoint?.importPricePerKwPowerNT;
            importPricePerKwPowerVT = this.supplyPoint?.importPricePerKwPowerVT;
            importPriceTotalPerYear = this.supplyPoint?.importPriceTotalPerYear;
            importPermanentMonthyPay = this.supplyPoint?.importPermanentMonthyPay;
        }

        this.form.controls['importPricePerKwGas'].setValue(importPricePerKwGas);
        this.form.controls['importPricePerKwPowerNT'].setValue(importPricePerKwPowerNT);
        this.form.controls['importPricePerKwPowerVT'].setValue(importPricePerKwPowerVT);
        this.form.controls['importPriceTotalPerYear'].setValue(importPriceTotalPerYear);
        this.form.controls['importPermanentMonthyPay'].setValue(importPermanentMonthyPay);
        this.resetFormError(false);
    }
}
