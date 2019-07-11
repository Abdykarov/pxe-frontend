import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Pipe({
    name: 'bannerType',
})
export class BannerTypePipe implements PipeTransform {

    private static readonly BANNER_TYPE = {
        [BannerTypeImages.ACCEPTED]: '/assets/images/illustrations/accepted.svg',
        [BannerTypeImages.DOCUMENTS]: '/assets/images/illustrations/documents.svg',
        [BannerTypeImages.DOCUMENTS_ALERT]: '/assets/images/illustrations/documents_alert.svg',
        [BannerTypeImages.HOUSE]: '/assets/images/illustrations/house.svg',
        [BannerTypeImages.HOUSE_ALERT]: '/assets/images/illustrations/house-alert.svg',
        [BannerTypeImages.LIGHT]: '/assets/images/illustrations/light.svg',
        [BannerTypeImages.LOADING]: '/assets/images/illustrations/loading.svg',
        [BannerTypeImages.MAIL_LETTER]: '/assets/images/illustrations/mail-letter.svg',
        [BannerTypeImages.SIGN]: '/assets/images/illustrations/sign.svg',
        [BannerTypeImages.UPLOAD]: '/assets/images/illustrations/upload.svg',
    };

    transform(bannerType: BannerTypeImages): string {
        return BannerTypePipe.BANNER_TYPE[bannerType];
    }
}
