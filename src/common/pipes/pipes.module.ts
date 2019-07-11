import { NgModule } from '@angular/core';

// own classes
import { BannerTypePipe } from 'src/common/pipes/banner-type/banner-type.pipe';
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { DecimalPipe } from '@angular/common';
import { DynamicPipe } from './dynamic/dynamic.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsDatePast } from './is-date-past/is-date-past.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ValuesPipe } from './values/values.pipe';
import { SupplyPointStatePipe } from './supply-point-state/supply-point-state.pipe';

@NgModule({
    declarations: [
        BannerTypePipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        PluralPipe,
        SupplyPointStatePipe,
        ValuesPipe,
    ],
    exports: [
        BannerTypePipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        PluralPipe,
        SupplyPointStatePipe,
        ValuesPipe,
    ],
    providers: [
        BannerTypePipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DecimalPipe,
        DynamicPipe,
        IsDatePast,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        PluralPipe,
        SupplyPointStatePipe,
        ValuesPipe,
    ],
})
export class PipesModule {}
