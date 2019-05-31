import { CommodityType } from 'src/common/graphql/models/supply.model';
import { Injectable } from '@angular/core';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointsOfferPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/basic/new-supply-point',
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/basic/supply-points-offer',
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: '/basic/contract-signing',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];
}

export const offerConfig1: ISupplyPointOffer = {
    benefits: [
        'Žárovka LED',
        'Žárovka LED žárovka',
        'Žárovka LED',
        'Žárovka LED žárovka',
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 823.00,
    priceGas: 0,
    priceNT: 3.14,
    priceVT: 3.54,
    supplier: {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
        logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
        supplierUrl: '',
        name: 'PRE',
        title: 'PRE',
        typeCommodity: TypeCommodity.POWER,
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
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
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 869.00,
    priceGas: 0,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
        logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
        supplierUrl: '',
        name: 'Pražská plynárenská',
        title: 'Pražská plynárenská',
        typeCommodity: TypeCommodity.POWER,
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
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 880.00,
    priceGas: 0,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
        logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
        supplierUrl: '',
        name: 'ČEZ',
        title: 'ČEZ',
        typeCommodity: TypeCommodity.POWER,
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
};
