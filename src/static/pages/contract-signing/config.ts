import {
    CommodityType,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { Injectable } from '@angular/core';

import { getConfigStepper } from 'src/common/utils/get-progress-stepper-config.fnc';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class ContractSigningPageConfig {
    public stepperProgressConfig =  getConfigStepper(ProgressStatus.OFFER_STEP);
}

export const offerConfig: ISupplyPointOffer = {
    benefits: [
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 823.00,
    priceGas: 0,
    priceNT: 0,
    priceVT: 3.54,
    supplier: {
        id: '',
        name: 'PRE',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
};
