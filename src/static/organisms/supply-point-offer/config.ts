import { IOffer } from 'src/common/graphql/models/offer.model';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

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
    priceNT: 3.14,
    priceVT: 3.54,
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
