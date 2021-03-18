import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class CreateUserFacade {
    public activeAskForOfferId$: Observable<string>;
    public activeSupplyPoint$: Observable<ISupplyPoint>;

    constructor(
        private supplyPointImportService: SupplyPointImportService,
    ) {
        this.activeAskForOfferId$ = this.getCreateUser$.pipe(map(R.prop('activeAskForOfferId')));
        this.activeSupplyPoint$ = this.getCreateUser$.pipe(map(R.prop('activeSupplyPoint')));
    }

    public getCreateUser$ = this.supplyPointImportService.getCreateUser()
        .pipe(
            map(({data}) => data.createUser),
        );

    public findSupplyPointImports$ = (askForOfferId: string) =>
        this.supplyPointImportService.findSupplyPointImports(askForOfferId)
            .pipe(
                map(({data}) => data.findSupplyPointImports),
            )

}
