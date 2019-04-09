import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

export const config: IMapCoverageConfig = {
    gas: {
        places: 447,
        notification: 2,
        consumption: 1300000000000,
        suppliers: [],
    },
    power: {
        places: 781,
        notification: 49,
        consumption: 1883500000,
        suppliers: [
            {
                logoUrl: 'https://cs.wikipedia.org/wiki/%C4%8CEZ#/media/File:%C4%8Cez_logo.PNG',
                title: 'Skupina ČEZ',
                supplierUrl: 'https://cs.wikipedia.org/wiki/%C4%8CEZ#/media/File:%C4%8Cez_logo.PNG',
            },
        ],
    },
};
