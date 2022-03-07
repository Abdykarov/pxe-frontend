import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllowProgressStepPipe } from 'src/common/pipes/common/allow-progress-step/allow-progress-step.pipe';
import { BestPricesInTheWorldPipe } from 'src/common/pipes/common/best-prices-in-the-world/best-prices-in-the-world.pipe';
import { CeilPipe } from 'src/common/pipes/common/ceil-number/simple-number.pipe';
import { IsLoggedPipe } from 'src/common/pipes/common/is-logged/is-logged.pipe';
import { LogoutInInformationPipe } from 'src/common/pipes/common/logout-in-information/logout-in-information.pipe';
import { OffersByCommodityTypePipe } from 'src/common/pipes/common/offers-by-commodity-type/offers-by-commodity-type.pipe';
import { PhonePipe } from 'src/common/pipes/common/phone/phone.pipe';
import { QuestionsToAccordionItemsPipe } from 'src/common/pipes/common/questions-to-accordion-items/questions-to-accordion-items.pipe';
import { SimpleNumberPipe } from 'src/common/pipes/common/simple-number/simple-number.pipe';
import { SumPipe } from 'src/common/pipes/common/sum/sum.pipe';
import { ValueOfFormPipe } from 'src/common/pipes/common/value-of-form/value-of-form.pipe';
// own classes
import { AccountNumberPipe } from './account-number/account-number.pipe';
import { ConsumptionIndicatorPipe } from './consumption-indicator/consumption-indicator.pipe';
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { DynamicPipe } from './dynamic/dynamic.pipe';
import { HtmlContentPipe } from './html-content/html-content.pipe';
import { InArrayPipe } from './in-array/in-array.pipe';
import { IsAllowedOperationPipe } from './is-allowed-operation/is-allowed-operation.pipe';
import { IsLastUpdatedOfferPipe } from './is-last-updated-offer/is-last-updated-offer.pipe';
import { IsMenuItemActivePipe } from './is-menu-item-active/is-menu-item-active.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PathValuePipe } from './path-value/path-value.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ProgressStatusPipe } from './step-of-supply-point/step-of-supply-point.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        AccountNumberPipe,
        AllowProgressStepPipe,
        BestPricesInTheWorldPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DynamicPipe,
        HtmlContentPipe,
        InArrayPipe,
        IsAllowedOperationPipe,
        IsLastUpdatedOfferPipe,
        IsLoggedPipe,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        LogoutInInformationPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PhonePipe,
        PluralPipe,
        ProgressStatusPipe,
        QuestionsToAccordionItemsPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
    exports: [
        AccountNumberPipe,
        AllowProgressStepPipe,
        BestPricesInTheWorldPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DynamicPipe,
        HtmlContentPipe,
        InArrayPipe,
        IsAllowedOperationPipe,
        IsLastUpdatedOfferPipe,
        IsLoggedPipe,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        LogoutInInformationPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PhonePipe,
        PluralPipe,
        ProgressStatusPipe,
        QuestionsToAccordionItemsPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
    providers: [
        AccountNumberPipe,
        BestPricesInTheWorldPipe,
        CeilPipe,
        ConsumptionPipe,
        ConsumptionIndicatorPipe,
        DecimalPipe,
        DynamicPipe,
        HtmlContentPipe,
        InArrayPipe,
        IsAllowedOperationPipe,
        IsLastUpdatedOfferPipe,
        IsLoggedPipe,
        IsMenuItemActivePipe,
        IsRouteActivePipe,
        KeysPipe,
        LogoutInInformationPipe,
        OffersByCommodityTypePipe,
        PathValuePipe,
        PhonePipe,
        PluralPipe,
        ProgressStatusPipe,
        QuestionsToAccordionItemsPipe,
        SimpleNumberPipe,
        SumPipe,
        ValueOfFormPipe,
        ValuesPipe,
    ],
})
export class PipesModule {}
