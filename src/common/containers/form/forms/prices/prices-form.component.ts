import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-price-form',
    templateUrl: './prices-form.component.html',
    styleUrls: ['./prices-form.component.scss'],
})
export class PricesFormComponent extends AbstractFormComponent implements OnChanges {

    @Input()
    public supplyPoint: ISupplyPoint;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        console.log(changes);
        if (changes && changes.supplyPoint) {
            this.prefillFormData();
            setTimeout( _ => this.setForm());
        }
    }

    public setForm = () => {
        if (this.supplyPoint.commodityType === CommodityType.POWER) {
            this.setDisableField('importPricePerKwGas');
        } else {
            this.setDisableField('importPricePerKwPowerNT');
            this.setDisableField('importPricePerKwPowerVT');
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

        if (this.supplyPoint) {
            importPricePerKwGas = this.supplyPoint.importPricePerKwGas;
            importPricePerKwPowerNT = this.supplyPoint.importPricePerKwPowerNT;
            importPricePerKwPowerVT = this.supplyPoint.importPricePerKwPowerVT;
            importPriceTotalPerYear = this.supplyPoint.importPriceTotalPerYear;
        }

        this.form.controls['importPricePerKwGas'].setValue(importPricePerKwGas);
        this.form.controls['importPricePerKwPowerNT'].setValue(importPricePerKwPowerNT);
        this.form.controls['importPricePerKwPowerVT'].setValue(importPricePerKwPowerVT);
        this.form.controls['importPriceTotalPerYear'].setValue(importPriceTotalPerYear);
        this.resetFormError(false);
    }
}
