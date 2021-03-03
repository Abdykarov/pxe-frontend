import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    combineLatest,
    Observable,
} from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { CODE_LIST_TYPES } from 'src/app/app.constants';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import {
    ICodelistOptions,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/ask-for-offer';
import {
    parseGraphQLErrors,
    removeRequiredValidators,
    transformCodeList,
} from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {
    public supplyPoint = null;
    public askForOfferId = this.route.snapshot.queryParams.askForOfferId;
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public codeLists = null;
    public formFields = formFields;

    public supplyPoint$: Observable<ISupplyPoint> = this.askForOfferService.
        findSupplyPointImport(this.askForOfferId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.findSupplyPointImport),
            );

    public codeLists$: Observable<ICodelistOptions> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
        this.formFields.controls = removeRequiredValidators(this.formFields.controls);
    }

    ngOnInit () {
        combineLatest([this.codeLists$, this.supplyPoint$])
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([codeLists, supplyPoint]) => {
                    console.log('___');
                    console.log(supplyPoint);
                    this.supplyPoint = supplyPoint;
                    this.codeLists = codeLists;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public submit = (data) => {
        const supplyPoint: ISupplyPointImportInput = this.askForOfferService.mapSupplyPointToSupplyPointInput(this.supplyPoint);
        supplyPoint.personalData = data;
        delete supplyPoint.address['__typename'];

        this.askForOfferService.createSupplyPointImport(
            this.askForOfferId,
            supplyPoint,
        ).subscribe( _ => {
            this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_PRICES], {
                queryParams: {
                    askForOfferId: this.askForOfferId,
                },
            });
        });
    }
}
