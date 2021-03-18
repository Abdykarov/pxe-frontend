import { Injectable } from '@angular/core';

import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CreateUserFacade {

    constructor(
        private supplyPointImportService: SupplyPointImportService,
    ) {}

    public activeOfferId$ = this.supplyPointImportService.getActiveAskForOfferIdQuery()
        .pipe(
            map(({data}) => data.getActiveAskForOfferIdQuery),
        );

    public findSupplyPointImports$ = (askForOfferId: string) =>
        this.supplyPointImportService.findSupplyPointImports(askForOfferId)
            .pipe(
                map(({data}) => data.findSupplyPointImports),
            )

}
