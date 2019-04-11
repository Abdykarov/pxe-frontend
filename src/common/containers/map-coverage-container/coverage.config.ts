import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

export const config: IMapCoverageConfig = {
    gas: {
        places: 447,
        stackCapacity: 2,
        consumption: 1300000000000,
        suppliers: [
            {
                alt: 'CEZ 2',
                logoUrl: 'assets/images/suppliers/logo.svg',
                logoUrlHover: 'assets/images/suppliers/logo.svg',
                supplierUrl: 'https://www.lundegaard.eu/cs/',
                title: 'Skupina ČEZ',
            },
        ],
    },
    power: {
        places: 781,
        temelinPerformance: 49,
        consumption: 1883500000,
        suppliers: [],
    },
};
