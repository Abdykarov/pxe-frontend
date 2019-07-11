import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { BannerType } from 'src/static/organisms/info-banner/info-banner.model';

@Pipe({
    name: 'bannerType',
})
export class BannerTypePipe implements PipeTransform {

    private static readonly BANNER_TYPE = {
        [BannerType.ACCEPTED]: '/assets/images/illustrations/accepted.svg',
        [BannerType.DOCUMENTS]: '/assets/images/illustrations/documents.svg',
        [BannerType.DOCUMENTS_ALERT]: '/assets/images/illustrations/documents_alert.svg',
        [BannerType.HOUSE]: '/assets/images/illustrations/house.svg',
        [BannerType.HOUSE_ALERT]: '/assets/images/illustrations/house-alert.svg',
        [BannerType.LIGHT]: '/assets/images/illustrations/light.svg',
        [BannerType.LOADING]: '/assets/images/illustrations/loading.svg',
        [BannerType.MAIL_LETTER]: '/assets/images/illustrations/mail-letter.svg',
        [BannerType.SIGN]: '/assets/images/illustrations/sign.svg',
        [BannerType.UPLOAD]: '/assets/images/illustrations/upload.svg',
    };

    transform(bannerType: BannerType): string {
        return BannerTypePipe.BANNER_TYPE[bannerType];
    }
}
