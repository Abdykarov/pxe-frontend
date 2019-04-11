import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

export const config: IMapCoverageConfig = {
    gas: {
        places: 447,
        notification: 2,
        consumption: 1300000000000,
        suppliers: [
            {
                logoUrl: 'assets/images/suppliers/logo.svg',
                title: 'Skupina ČEZ',
                supplierUrl: 'https://www.lundegaard.eu/cs/',
            },
        ],
    },
    power: {
        places: 781,
        notification: 49,
        consumption: 1883500000,
        suppliers: [],
    },
};
