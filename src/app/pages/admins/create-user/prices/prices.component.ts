import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import {formFields} from 'src/common/containers/form/forms/prices/prices-form.config';
import {map, takeUntil} from 'rxjs/operators';
import {ISupplyPoint} from '../../../../../common/graphql/models/supply.model';
import {AskForOfferService} from '../../../../../common/graphql/services/ask-for-offer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss'],
})
export class PricesComponent extends AbstractComponent implements OnInit {
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public askForOfferId = this.route.snapshot.queryParams.askForOfferId;
    public supplyPoint: ISupplyPoint;

    constructor(
        public askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,

    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.askForOfferService.
            findSupplyPointImport(this.askForOfferId)
                .pipe(
                    takeUntil(this.destroy$),
                    map(({data}) => data.findSupplyPointImport),
                )
                .subscribe( (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.cd.markForCheck();
                });
    }

    public send = () => {
        this.askForOfferService.finalizeAskForOffer(this.askForOfferId).subscribe();
    }


    public submit = (prices) => {
        let supplyPointImport = this.askForOfferService.mapSupplyPointToSupplyPointInput(this.supplyPoint);
        supplyPointImport.importPricePerKwGas = parseFloat(prices.importPricePerKwGas);
        supplyPointImport.importPricePerKwPowerNT = parseFloat(prices.importPricePerKwPowerNT);
        supplyPointImport.importPricePerKwPowerVT = parseFloat(prices.importPricePerKwPowerVT);
        supplyPointImport.importPriceTotalPerYear = parseFloat(prices.importPriceTotalPerYear);
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
        supplyPointImport = JSON.parse(JSON.stringify(supplyPointImport), omitTypename);
        this.askForOfferService.createSupplyPointImport(this.askForOfferId,  supplyPointImport).subscribe();
    }
}
