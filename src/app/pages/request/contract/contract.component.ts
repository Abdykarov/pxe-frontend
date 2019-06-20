import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map, switchMap,
    takeUntil,
} from 'rxjs/operators';

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
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends AbstractComponent implements OnInit {
    public configStepper = configStepper;
    public contractTemplate;
    public showOffer = true;
    public personData: IPersonalData = personData;
    public offer = offer;

    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formFields = formFields;

    public supplyPointId = this.route.snapshot.paramMap.get('supplyPointId');
    public supplyPoint: ISupplyPoint;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private route: ActivatedRoute,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }

    ngOnInit () {
        super.ngOnInit();
        console.log(this.supplyPointId);
        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
                switchMap( (supplyPoint: ISupplyPoint) => {
                   return this.contractService.getContractTerms(supplyPoint.id);
                }),
            ).subscribe(
                (content: any) => {
                    console.log(content);
                    this.contractTemplate = content;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }
}
