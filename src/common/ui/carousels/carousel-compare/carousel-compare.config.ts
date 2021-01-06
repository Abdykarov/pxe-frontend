import { ISupplierCompare } from 'src/common/ui/carousels/models/models';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';

export const mapTypeOfDeviceToNumberOfSlides = {
    [TypeOfResolution.DESKTOP]: 4,
    [TypeOfResolution.TABLET]: 2,
    [TypeOfResolution.MOBILE]: 1,
};

export const supplierCompares: ISupplierCompare[] = [
    {
        region: 'Hlavní město Praha',
        savingPower: 2299,
        savingGas: 10512,
    },
    {
        region: 'Jihočeský kraj',
        savingPower: 3105,
        savingGas: 10207,
    },
    {
        region: 'Plzeňský kraj',
        savingPower: 2217,
        savingGas: 9763,
    },
    {
        region: 'Moravskoslezský kraj',
        savingPower: 2217,
        savingGas: 9763,
    },
    {
        region: 'Jihomoravský kraj',
        savingPower: 3105,
        savingGas: 10207,
    },
    {
        region: 'Ostatní kraje',
        savingPower: 2217,
        savingGas: 9763,
    },
];
