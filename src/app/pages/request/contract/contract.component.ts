import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    configStepper,
    offer,
    personData,
} from './contract.config';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { formFields } from 'src/common/containers/form/forms/contract/contract-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends AbstractComponent implements OnInit {
    public configStepper = configStepper;

    public showOffer = true;
    public personData: IPersonalData = personData;
    public offer = offer;

    public contractTemplate;

    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formFields = formFields;

    constructor(
        private contractService: ContractService,
    ) {
        super();
    }

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }

    ngOnInit () {
        super.ngOnInit();
        this.contractService.getContractTerms(1)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe( ({data}) => {
                this.contractTemplate = data.getContractTerms.content;
            });
    }
}
