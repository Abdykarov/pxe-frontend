import { CommodityType } from 'src/common/graphql/models/supply.model';
import { Injectable } from '@angular/core';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
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
