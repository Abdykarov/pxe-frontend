import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DayBetweenDaysPipe } from './day-between-days/day-between-days.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DayBetweenDaysPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
    exports: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DayBetweenDaysPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        PluralPipe,
        ValuesPipe,
    ],
    providers: [
        ConsumptionPipe,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
})
export class PipesModule {}
