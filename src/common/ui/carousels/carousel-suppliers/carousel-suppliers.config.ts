import { TypeOfResolution } from 'src/common/models/type-of-resolution';

export const mapTypeOfDeviceToNumberOfSlides = {
    [TypeOfResolution.DESKTOP]: 3,
    [TypeOfResolution.TABLET]: 3,
    [TypeOfResolution.MOBILE]: 2,
};
