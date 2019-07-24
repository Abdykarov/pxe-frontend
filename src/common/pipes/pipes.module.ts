import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { DynamicPipe } from './dynamic/dynamic.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsAllowedOperationPipe } from './is-allowed-operation/is-allowed-operation.pipe';
import { IsDatePast } from './is-date-past/is-date-past.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { NewSupplyWillBeginPipe } from './new-supply-will-begin/new-supply-will-begin.pipe';
import { PathValuePipe } from './path-value/path-value.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ProgressStatusPipe } from './step-of-supply-point/step-of-supply-point.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        NewSupplyWillBeginPipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        ValuesPipe,
    ],
    exports: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        NewSupplyWillBeginPipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        ValuesPipe,
    ],
    providers: [
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DecimalPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsRouteActivePipe,
        KeysPipe,
        NewSupplyWillBeginPipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        ValuesPipe,
    ],
})
export class PipesModule {}
