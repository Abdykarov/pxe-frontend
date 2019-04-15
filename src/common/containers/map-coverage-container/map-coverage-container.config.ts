import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

export const config: IMapCoverageConfig = {
    gas: {
        places: 447,
        stackCapacity: 2,
        consumption: 1300000000000,
        suppliers: [],
    },
    power: {
        places: 781,
        temelinPerformance: 49,
        consumption: 1883500000,
        suppliers: [
            {
                alt: 'logo - Pražská energetika, a. s.',
                logoUrl: '/assets/images/landing-page/suppliers/logo_PRE.svg',
                logoUrlHover: '/assets/images/landing-page/suppliers/logo_PRE-hover.svg',
                supplierUrl: 'https://www.pre.cz/',
                title: 'Pražská energetika, a. s.',
            },
            {
                alt: 'logo - Burza cenných papírů Praha, a.s.',
                logoUrl: '/assets/images/landing-page/suppliers/logo_BCPP.svg',
                logoUrlHover: '/assets/images/landing-page/suppliers/logo_BCPP-hover.svg',
                supplierUrl: 'https://www.pse.cz/',
                title: 'Burza cenných papírů Praha, a.s.',
            },
        ],
    },
};
