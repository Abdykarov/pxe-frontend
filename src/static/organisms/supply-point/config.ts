import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';

export const supplyPointConfigPower: ISupplyPointFindData = {
    'id': '72',
    'name': 'Vilka',
    'commodityType': 'POWER',
    'supplier': {
        'id': '6049',
        'name': 'Test Agata',
        'vatNumber': '5348641',
        'logoPath': '',
        'sampleDocuments': [],
    },
    'ean': '859182400813432086',
    'address': {
        'street': 'Milady Horákové',
        'orientationNumber': '46',
        'descriptiveNumber': '491',
        'city': 'Svitavy',
        'postCode': '56802',
        'region': 'Pardubický kraj',
    },
    'distributionRate': {
        'type': 'DSTSAZ',
        'code': 'C01d',
        'description': 'C01d',
        'help': 'C01d',
    },
    'circuitBreaker': {
        'type': 'JISTIC',
        'code': '<= 1x25A',
        'description': 'menší než 1x25A včetně',
        'help': 'menší než 1x25A včetně',
    },
    'annualConsumptionNT': 1.15,
    'expirationDate': '2019-05-17',
    'subject': {
        'type': 'TPSB',
        'code': '1',
        'description': 'Fyzická osoba',
        'help': 'Fyzická osoba',
    },
    'lastAnnualConsumptionNT': 1.25,
    'lastAnnualConsumptionVT': 1.35,
};

export const supplyPointConfigGas: ISupplyPointFindData = {
    'id': '77',
    'name': 'Můj byt',
    'commodityType': 'GAS',
    'supplier': {
        'id': '6049',
        'name': 'Test Agata',
        'vatNumber': '5348641',
        'logoPath': '',
        'sampleDocuments': [],
    },
    'ean': '27zg700z0069625e',
    'address': {
        'street': 'Milady Horákové',
        'orientationNumber': '46',
        'descriptiveNumber': '491',
        'city': 'Svitavy',
        'postCode': '56802',
        'region': 'Pardubický kraj',
    },
    'distributionRate': null,
    'circuitBreaker': null,
    'annualConsumptionNT': 1.45,
    'expirationDate': '2019-05-17',
    'subject': {
        'type': 'TPSB',
        'code': '1',
        'description': 'Fyzická osoba',
        'help': 'Fyzická osoba',
    },
    'lastAnnualConsumptionNT': 1.25,
    'lastAnnualConsumptionVT': 1.35,
};
