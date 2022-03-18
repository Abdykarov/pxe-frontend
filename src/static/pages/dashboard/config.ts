import {
    CommodityType,
    ISupplyPointStatistic,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

export const supplyPointStatistic: ISupplyPointStatistic = {
    concludedCount: 1,
    concludedItems: [
        {
            id: 1578,
            name: 'doba urcita s prolog',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.OFFER_STEP,
        },
    ],
    gasAnnualConsumptionSum: 21.5,
    gasCount: 2,
    notConcludedCount: 1,
    notConcludedItems: [
        {
            id: 1578,
            name: 'doba urcita s prolog',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.OFFER_STEP,
        },
    ],
    powerAnnualConsumptionSum: 17.481,
    powerCount: 24,
    showDeliveryCount: 1,
    showDeliveryItems: [
        {
            id: 1211,
            name: 'Stresni byt',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.SUPPLY_POINT,
        },
    ],
};

export const supplyPointStatisticMore: ISupplyPointStatistic = {
    concludedCount: 0,
    concludedItems: [],
    gasAnnualConsumptionSum: 21.5,
    gasCount: 2,
    notConcludedCount: 2,
    notConcludedItems: [
        {
            id: 1578,
            name: 'doba urcita s prolog',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.OFFER_STEP,
        },
        {
            id: 1578,
            name: 'doba urcita s prolog',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.OFFER_STEP,
        },
    ],
    powerAnnualConsumptionSum: 17.481,
    powerCount: 24,
    showDeliveryCount: 2,
    showDeliveryItems: [
        {
            id: 1211,
            name: 'Stresni byt',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.SUPPLY_POINT,
        },
        {
            id: 1211,
            name: 'Stresni byt',
            commodityType: CommodityType.POWER,
            progressStatus: ProgressStatus.SUPPLY_POINT,
        },
    ],
};

export const supplyPointStatisticNone: ISupplyPointStatistic = {
    concludedCount: 0,
    concludedItems: [],
    gasAnnualConsumptionSum: 21.5,
    gasCount: 2,
    notConcludedCount: 0,
    notConcludedItems: [],
    powerAnnualConsumptionSum: 17.481,
    powerCount: 24,
    showDeliveryCount: 0,
    showDeliveryItems: [],
};
