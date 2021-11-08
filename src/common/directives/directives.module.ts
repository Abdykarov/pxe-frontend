import { NgModule } from '@angular/core';
import { SBiometricsDirective } from 'src/common/directives/s-analytics/s-biometrics.directive';
import { SFormDirective } from 'src/common/directives/s-analytics/s-form.directive';
import { MaskDateDirective } from './datepicker/datepicker.directive';
import { DisplayNoneOnFirefoxDirective } from './display-none-on-firefox/display-none-on-firefox.directive';
import { FirstTimeInViewDirective } from './first-time-in-view/first-time-in-view.directive';
import { OffClickDirective } from './off-click/off-click.directive';
import { OptionHighlightDirective } from './option-highlight/option-highlight.directive';

@NgModule({
    declarations: [
        MaskDateDirective,
        OffClickDirective,
        OptionHighlightDirective,
        SBiometricsDirective,
        SFormDirective,
        FirstTimeInViewDirective,
        DisplayNoneOnFirefoxDirective,
    ],
    exports: [
        MaskDateDirective,
        OffClickDirective,
        OptionHighlightDirective,
        SBiometricsDirective,
        SFormDirective,
        FirstTimeInViewDirective,
        DisplayNoneOnFirefoxDirective,
    ],
})
export class DirectivesModule {}
