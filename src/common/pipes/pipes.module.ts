import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { DecimalPipe } from '@angular/common';
import { DynamicPipe } from './dynamic/dynamic.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
    exports: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        PluralPipe,
        ValuesPipe,
    ],
    providers: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DecimalPipe,
        DynamicPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
})
export class PipesModule {}
