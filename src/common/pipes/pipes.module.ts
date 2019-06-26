import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsDatePast } from './is-date-past/is-date-past.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ValuesPipe } from './values/values.pipe';
import { SupplyPointStatePipe } from './supply-point-state/supply-point-state.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        FilterCommodityTypePipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        PluralPipe,
        SupplyPointStatePipe,
        ValuesPipe,
    ],
    exports: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        IsDatePast,
        IsRouteActivePipe,
        FilterCommodityTypePipe,
        KeysPipe,
        PluralPipe,
        SupplyPointStatePipe,
        ValuesPipe,
    ],
    providers: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
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
