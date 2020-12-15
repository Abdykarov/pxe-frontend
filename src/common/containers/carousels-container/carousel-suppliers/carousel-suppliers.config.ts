import { ISupplierLogo } from 'src/common/containers/carousels-container/models/models';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';

export const supplierLogos: ISupplierLogo[] = [
    {
        alt: 'logo - Alpiq CZ',
        logoUrl: '/assets/images/suppliers/logo_alpiq-white.svg',
        title: 'Alpiq CZ',
        width: 100,
    },
    {
        alt: 'logo - Bohemia Energy entity s.r.o.',
        logoUrl: '/assets/images/suppliers/logo_bohemia-energy-white.svg',
        title: 'Bohemia Energy entity s.r.o.',
        width: 120,
    },
    {
        alt: 'logo - EP Energy Trading a.s.',
        logoUrl: '/assets/images/suppliers/logo_ep-energy-trading-white.svg',
        title: 'EP Energy Trading a.s.',
        width: 130,
    },
    {
        alt: 'logo - Yello Energy',
        logoUrl: '/assets/images/suppliers/logo_yello-energy-white.svg',
        title: 'Yello Energy',
        width: 140,
    },
    {
        alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
        logoUrl: '/assets/images/suppliers/logo_carbounion-bohemia-white.svg',
        title: 'CARBOUNION BOHEMIA, spol. s r. o.',
        width: 150,
    },
    {
        alt: 'logo - Pražská plynárenská a.s.',
        logoUrl: '/assets/images/suppliers/logo_prazska-plynarenska-white.svg',
        title: 'Pražská plynárenská a.s.',
        width: 160,
    },
];

export const mapTypeOfDeviceToNumberOfSlides = {
    [TypeOfResolution.DESKTOP]: 3,
    [TypeOfResolution.TABLET]: 3,
    [TypeOfResolution.MOBILE]: 2,
};
