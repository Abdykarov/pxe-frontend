import { Injectable } from '@angular/core';

import {
    CommodityType,
    SupplyPointState,
} from 'src/common/graphql/models/supply.model';
import { getConfigStepperByState } from 'src/common/utils/get-progress-stepper-config.fnc';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointsOfferPageConfig {
    public stepperProgressConfig = getConfigStepperByState(SupplyPointState.CHOOSE_OFFER);
}

export const offerConfig1: ISupplyPointOffer = {
    id: 0,
    supplier: {
        id: '',
        name: 'PRE',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    commodityType: CommodityType.POWER,
    name: '',
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
    benefits: [
        'Žárovka LED',
        'Žárovka LED žárovka',
        'Žárovka LED',
        'Žárovka LED žárovka',
    ],
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    permanentPaymentPrice: 823.00,
    priceGas: 0,
    priceNT: 3.14,
    priceVT: 3.54,
};

export const offerConfig2: ISupplyPointOffer = {
    benefits: [
        'LED Lorem žárovka',
        'LED Lorem',
        'LED Lorem žárovka',
        'LED Lorem',
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 869.00,
    priceGas: 0,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        id: '',
        name: 'Pražská plynárenská',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
};

export const offerConfig3: ISupplyPointOffer = {
    benefits: [
        'LED Lorem žárovka',
        'LED Lorem',
        'LED Lorem žárovka',
        'LED Lorem',
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 880.00,
    priceGas: 0,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        id: '',
        name: 'ČEZ',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
};
