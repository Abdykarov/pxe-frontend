import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// own classes
import { AccountNumberPipe } from './account-number/account-number.pipe';
import { AccordionBenefitsPipe } from 'src/common/pipes/accordion-benefits.pipe/according-benefits.pipe';
import { AllowProgressStepPipe } from 'src/common/pipes/allow-progress-step/allow-progress-step.pipe';
import { CeilPipe } from 'src/common/pipes/ceil-number/simple-number.pipe';
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { DynamicPipe } from './dynamic/dynamic.pipe';
import { FilterCommodityTypePipe } from './filter-commodity-type/filter-commodity-type.pipe';
import { IsAllowedOperationPipe } from './is-allowed-operation/is-allowed-operation.pipe';
import { IsDatePast } from './is-date-past/is-date-past.pipe';
import { IsMenuItemActivePipe } from './is-menu-item-active/is-menu-item-active.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { LogoutInInformationPipe } from 'src/common/pipes/logout-in-information/logout-in-information.pipe';
import { NewSupplyWillBeginPipe } from './new-supply-will-begin/new-supply-will-begin.pipe';
import { OffersByCommodityTypePipe } from 'src/common/pipes/offers-by-commodity-type/offers-by-commodity-type.pipe';
import { PathValuePipe } from './path-value/path-value.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ProgressStatusPipe } from './step-of-supply-point/step-of-supply-point.pipe';
import { SimpleNumberPipe } from 'src/common/pipes/simple-number/simple-number.pipe';
import { SumPipe } from 'src/common/pipes/sum/sum.pipe';
import { ValueOfFormPipe } from 'src/common/pipes/value-of-form/value-of-form.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        AccountNumberPipe,
        AccordionBenefitsPipe,
        AllowProgressStepPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        NewSupplyWillBeginPipe,
        LogoutInInformationPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
    exports: [
        AccountNumberPipe,
        AccordionBenefitsPipe,
        AllowProgressStepPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        NewSupplyWillBeginPipe,
        LogoutInInformationPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
    providers: [
        AccountNumberPipe,
        AccordionBenefitsPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DateDiffPipe,
        DecimalPipe,
        DynamicPipe,
        FilterCommodityTypePipe,
        IsAllowedOperationPipe,
        IsDatePast,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        LogoutInInformationPipe,
        NewSupplyWillBeginPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PluralPipe,
        ProgressStatusPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
})
export class PipesModule {}
