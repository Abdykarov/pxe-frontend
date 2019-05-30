import { CommodityType } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

export const config: ISupplyPointOffer[] = [
    {
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
            name: 'PRE',
            title: 'PRE',
            typeCommodity: TypeCommodity.POWER,
        },
        validFrom: '2019-03-12T22:59:12.133Z',
        validTo:   '2090-06-02T10:42:12.000Z',
    },
    {
        benefits: [
            'Žárovka LED Lorem',
            'Žárovka LED Lorem',
            'Žárovka LED Lorem',
            'Žárovka LED Lorem',
        ],
        commodityType: CommodityType.GAS,
        deliveryFrom: '',
        deliveryLength: 1,
        id: 0,
        name: '',
        permanentPaymentPrice: 963.00,
        priceGas: 3.36,
        priceNT: 0,
        priceVT: 0,
        supplier: {
            alt: 'logo - Alpiq CZ',
            logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
            logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
            supplierUrl: '',
            name: 'PRE',
            title: 'PRE',
            typeCommodity: TypeCommodity.GAS,
        },
        validFrom: '2019-02-12T22:59:12.133Z',
        validTo: '2090-02-25T22:59:12.133Z',
    },
];
