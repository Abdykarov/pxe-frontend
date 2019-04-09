import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

export const config: IMapCoverageConfig = {
    gas: {
        places: 447,
        notification: 2,
        consumption: 1300000000000,
        suppliers: [
            {
                logoUrl: 'assets/images/suppliers/logo/logo.svg',
                title: 'Skupina ČEZ',
                supplierUrl: 'assets/images/suppliers/supplier/logo.svg',
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
