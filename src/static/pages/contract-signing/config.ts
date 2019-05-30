import { Injectable } from '@angular/core';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

@Injectable({
    providedIn: 'root',
})
export class ContractSigningPageConfig {
    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/basic/new-supply-point',
            done: true,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/basic/menu-selection',
            done: true,
            label: 'Výběr nabídky',
        },
        {
            url: '/basic/contract-signing',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];
}

export const offerConfig: IOffer = {
    annualConsumption: undefined,
    benefits: [
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
    ],
    circuitBreaker: undefined,
    commodityType: '',
    deliveryFrom: '',
    deliveryLength: 1,
    deliveryTo: '',
    distributionLocation: '',
    distributionRate: undefined,
    id: 0,
    name: '',
    permanentPaymentPrice: 823.00,
    priceGas: 0,
    priceNT: 0,
    priceVT: 3.42,
    status: '',
    subject: undefined,
    supplier: {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
        logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
        supplierUrl: '',
        title: 'PRE',
        typeCommodity: TypeCommodity.POWER,
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: '2019-03-31T22:59:12.133Z',
};