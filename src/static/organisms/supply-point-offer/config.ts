import { CommodityType } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

export const offerConfig: ISupplyPointOffer = {
    benefits: [
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
        'Žárovka LED Lorem',
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
        title: 'PRE',
        typeCommodity: TypeCommodity.POWER,
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
};
