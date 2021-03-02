import {
    Component, Input, OnChanges,
    OnDestroy, SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {ISupplyPoint} from '../../../../graphql/models/supply.model';
import {getErrorMessage} from '../../../../utils';

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
        if (changes && changes.supplyPoint) {
            this.prefillFormData();
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

        console.log(this.supplyPoint);

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
