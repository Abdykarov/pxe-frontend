import {
    ISupplierLogo,
    TypeCommodity,
} from 'src/common/ui/supplier/model/supplier.model';

export const config: ISupplierLogo[] = [
    {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
        logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
        supplierUrl: '',
        title: 'Alpiq CZ',
        width: 81,
        typeCommodity: TypeCommodity.POWER,
    },
    {
        alt: 'logo - Bohemia Energy entity s.r.o.',
        logoUrl: '/assets/images/suppliers/logo_bohemia-energy.svg',
        logoUrlHover: '/assets/images/suppliers/logo_bohemia-energy-hover.svg',
        supplierUrl: '',
        size: 'sm',
        title: 'Bohemia Energy entity s.r.o.',
        width: 185,
        typeCommodity: TypeCommodity.BOTH,
    },
    {
        alt: 'logo - EP Energy Trading a.s.',
        logoUrl: '/assets/images/suppliers/logo_ep-energy-trading.svg',
        logoUrlHover: '/assets/images/suppliers/logo_ep-energy-trading-hover.svg',
        supplierUrl: '',
        title: 'EP Energy Trading a.s.',
        width: 75,
        typeCommodity: TypeCommodity.BOTH,
    },
    {
        alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
        logoUrl: '/assets/images/suppliers/logo_carbounion-bohemia@2x.png',
        logoUrlHover: '/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png',
        supplierUrl: '',
        size: 'xl',
        title: 'CARBOUNION BOHEMIA, spol. s r. o.',
        width: 70,
        typeCommodity: TypeCommodity.BOTH,
    },
];
