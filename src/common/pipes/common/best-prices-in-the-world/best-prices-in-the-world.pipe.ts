import { Pipe, PipeTransform } from '@angular/core';
import { ILandingPageContent } from 'src/common/cms/models/landing-page';
import { CommodityType } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'bestPricesInTheWorldSection',
})
export class BestPricesInTheWorldPipe implements PipeTransform {
    transform(
        landingPage: ILandingPageContent,
        commodityType: CommodityType,
        property: string
    ): any {
        return landingPage.bestPricesInTheWorldSection?.carouselDiscount[
            commodityType === CommodityType.POWER ? 0 : 1
        ]?.[property];
    }
}
