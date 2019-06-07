import {
    CommodityType,
    IAddress,
    ICodelistItem,
} from 'src/common/graphql/models/supply.model';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ROUTES } from 'src/app/app.constants';
import { TypeCommodity } from 'src/common/ui/supplier/model/supplier.model';

export const configStepper: IStepperProgressItem[] = [
    {
        url: ROUTES.ROUTER_REQUEST_SUPPLY_POINT,
        done: true,
        label: 'Výběr odběrného místa',
    },
    {
        url: ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
        done: true,
        label: 'Výběr nabídky',
    },
    {
        url: ROUTES.ROUTER_REQUEST_CONTRACT,
        done: false,
        label: 'Podepsání smlouvy',
    },
];

export const offer = {
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
    priceNT: 0,
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

export const personData: IPersonalData = {
    name: 'Personal data',
    ico: 'ICO',
    dic: 'DIC',
    address1: null,
    address2: null,
    email: 'email',
    phone: '+420 745 879 456',
    bankAccountNumber: '54687945',
    bankCode: '564',
    depositPaymentType: null,
    deposit: 500,
};
