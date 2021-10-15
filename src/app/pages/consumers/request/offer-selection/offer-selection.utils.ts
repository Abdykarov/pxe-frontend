import * as R from 'ramda';

import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    IOffer,
    ISupplyPointImportPrices,
    ISupplyPointOffers,
} from 'src/common/graphql/models/offer.model';

export const countTotalPriceIncludeAnnualConsumption = (
    {
        annualConsumptionVT = 0,
        annualConsumptionNT = 0,
        annualConsumption = 0,
    }: ISupplyPoint,
    {
        importPricePerKwPowerVT = 0,
        importPricePerKwPowerNT = 0,
        importPricePerKwGas = 0,
        importPermanentMonthlyPay = 0,
    }: ISupplyPointImportPrices,
    {
        priceVTWithVAT = 0,
        priceNTWithVAT = 0,
        priceGasWithVAT = 0,
        monthlyConsumptionFee = 0,
    }: IOffer,
): number => {
    const vtCount = annualConsumptionVT * (importPricePerKwPowerVT || priceVTWithVAT);
    const ntCount = annualConsumptionNT * (importPricePerKwPowerNT || priceNTWithVAT);
    const gasCount = annualConsumption * (importPricePerKwGas || priceGasWithVAT);
    const totalPriceCount = (importPermanentMonthlyPay || monthlyConsumptionFee) * 12;
    return vtCount + ntCount + gasCount + totalPriceCount;
};

export const emptySupplyPointImportPrices: ISupplyPointImportPrices = {
    importPermanentMonthlyPay: 0,
    importPricePerKwGas: 0,
    importPricePerKwPowerNT: 0,
    importPricePerKwPowerVT: 0,
    importPriceTotalPerYear: 0,
};

export const emptySupplyPoint: IOffer = {
    accountingRegulatedPrice: 0,
    annualConsumption: undefined,
    benefits: undefined,
    circuitBreaker: undefined,
    commodityType: CommodityType.POWER,
    consumptionPriceGas: 0,
    consumptionPriceNT: 0,
    consumptionPriceVT: 0,
    deliveryFrom: '',
    deliveryLength: 0,
    deliveryTo: '',
    distributionLocation: '',
    distributionPriceByCapacity: 0,
    distributionPriceByConsumptionGas: 0,
    distributionPriceByConsumptionNT: 0,
    distributionPriceByConsumptionVT: 0,
    distributionRate: undefined,
    energyTaxRegulatedPrice: 0,
    greenEnergy: false,
    id: '',
    isLastUpdated: false,
    isOwnOffer: false,
    marked: false,
    marketOrganizerRegulatedPrice: 0,
    monthlyConsumptionFee: 0,
    name: '',
    permanentPaymentPrice: 0,
    priceGas: 0,
    priceGasWithVAT: 0,
    priceNT: 0,
    priceNTWithVAT: 0,
    priceVT: 0,
    priceVTWithVAT: 0,
    question: undefined,
    renewableEnergyRegulatedPrice: 0,
    status: '',
    subject: undefined,
    supplier: undefined,
    systemServicesRegulatedPrice: 0,
    totalPrice: 0,
    totalPriceIncludeAnnualConsumption: 0,
    unit: '',
    validFrom: '',
    validTo: '',
};

export const supplyPointImportPricesToOffer = (
    supplyPoint: ISupplyPoint,
    supplyPointImportPrices: ISupplyPointImportPrices,
): IOffer => {
    if (supplyPointImportPrices?.importPermanentMonthlyPay != null) {
        return {
            __typename: '',
            accountingRegulatedPrice: 0,
            annualConsumption: undefined,
            benefits: undefined,
            circuitBreaker: undefined,
            commodityType: '',
            consumptionPriceGas: 0,
            consumptionPriceNT: 0,
            consumptionPriceVT: 0,
            deliveryFrom: '',
            deliveryLength: 0,
            deliveryTo: '',
            distributionLocation: '',
            distributionPriceByCapacity: 0,
            distributionPriceByConsumptionGas: 0,
            distributionPriceByConsumptionNT: 0,
            distributionPriceByConsumptionVT: 0,
            distributionRate: undefined,
            energyTaxRegulatedPrice: 0,
            greenEnergy: false,
            id: '',
            isLastUpdated: false,
            isOwnOffer: false,
            marked: false,
            marketOrganizerRegulatedPrice: 0,
            monthlyConsumptionFee: 0,
            name: supplyPoint?.contract?.offer?.name,
            permanentPaymentPrice: supplyPointImportPrices.importPriceTotalPerYear / 12,
            priceGas: 0,
            priceGasWithVAT: supplyPointImportPrices?.importPricePerKwGas,
            priceNT: 0,
            priceNTWithVAT: supplyPointImportPrices?.importPricePerKwPowerNT,
            priceVT: 0,
            priceVTWithVAT: supplyPointImportPrices?.importPricePerKwPowerVT,
            question: undefined,
            renewableEnergyRegulatedPrice: 0,
            status: '',
            subject: undefined,
            supplier: supplyPoint?.supplier,
            systemServicesRegulatedPrice: 0,
            totalPrice: supplyPointImportPrices?.importPermanentMonthlyPay,
            unit: '',
            validFrom: '',
            validTo: '',
            totalPriceIncludeAnnualConsumption:
                countTotalPriceIncludeAnnualConsumption(supplyPoint, supplyPointImportPrices, emptySupplyPoint),
        };
    }
    return null;
};

export const setTotalPriceWithAnnualConsumption =
    (supplyPoint: ISupplyPoint, supplyPointOffers: ISupplyPointOffers): ISupplyPointOffers => {

    R.forEach((offer: IOffer) =>
        offer.totalPriceIncludeAnnualConsumption = countTotalPriceIncludeAnnualConsumption(
            supplyPoint,
            emptySupplyPointImportPrices,
            offer,
        ),
    )(supplyPointOffers.offers);

    return supplyPointOffers;
};

export const sortByTotalPriceAscend = R.sort(R.ascend(R.prop('totalPriceIncludeAnnualConsumption')));

export const addPastOfferToFindSupplyPointOffers =
    (supplyPoint: ISupplyPoint, supplyPointOffers: ISupplyPointOffers): IOffer[] => {

    const pastOffer: IOffer = supplyPoint?.contract?.offer ||
    supplyPointOffers.pastOffer ||
    supplyPointImportPricesToOffer(supplyPoint, supplyPointOffers.supplyPointImportPrices);

    return R.pipe(
        R.prop('offers'),
        R.append(pastOffer),
        R.reject(R.isNil),
    )(supplyPointOffers);
};

// We dont load offer id to apollo, because of cache problem
export const isCurrentOffer = (paramOffer: IOffer): boolean => !paramOffer.id;

export const ifCurrentIsTheBestRemoveIt = (offers: IOffer[]): IOffer[] => {
    if (offers.length === 0) {
        return [];
    }

    const firstOffer = R.head(offers);
    const isFirstTheBestOffer = isCurrentOffer(firstOffer);
    if (isFirstTheBestOffer) {
        return R.drop(1, offers);
    }
    return offers;
};

export const filterOffersOnlyActualSupplier = (supplyPoint: ISupplyPoint, supplyPointOffers: IOffer[]): IOffer[] => {
    if (!R.isNil(supplyPointOffers) && !R.isNil(supplyPoint)) {
        return R.filter((supplyPointOffer: IOffer) =>
            supplyPointOffer.supplier.id === supplyPoint?.supplier?.id)
        (supplyPointOffers);
    }
    return supplyPointOffers;
};




