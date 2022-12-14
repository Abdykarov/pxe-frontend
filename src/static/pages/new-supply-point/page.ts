import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OWN_TERMINATE_OPTIONS } from 'src/app/app.constants';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { NewSupplyPointPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class NewSupplyPointPageComponent {
    public form: FormGroup = new FormGroup({
        supplierId: new FormControl(),
        distributionRateId: new FormControl(),
        phasesId: new FormControl(),
        circuitBreakerId: new FormControl(),
        address: new FormControl(),
        contractEndTypeId: new FormControl(),
        timeToContractEnd: new FormControl(),
        timeToContractEndPeriodId: new FormControl(),
        ownTerminate: new FormControl(),
        withoutSupplier: new FormControl(),
    });

    public ownTerminateOptions: Array<IOption> = OWN_TERMINATE_OPTIONS;

    constructor(public config: NewSupplyPointPageConfig) {
        this.form.controls['supplierId'].disable();
    }

    public bannerObj: IBannerObj = {
        text: 'Evidujeme u vás nedokončené odběrné místo, chcete načíst tyto údaje?',
    };

    public openModal = () => alert('MODAL OPENED');

    public submitAction = () => alert('SUBMIT ACTION');
}
