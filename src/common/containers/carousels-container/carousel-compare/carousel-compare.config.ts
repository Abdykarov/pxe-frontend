import { TypeOfResolution } from 'src/common/models/type-of-resolution';

export const mapTypeOfDeviceToNumberOfSlides = {
    [TypeOfResolution.DESKTOP]: 4,
    [TypeOfResolution.TABLET]: 2,
    [TypeOfResolution.MOBILE]: 1,
};
