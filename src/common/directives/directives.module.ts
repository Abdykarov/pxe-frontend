import { NgModule } from '@angular/core';

import { FirstTimeInViewDirective } from './first-time-in-view/first-time-in-view.directive';
import { MaskDateDirective } from './datepicker/datepicker.directive';
import { OffClickDirective } from './off-click/off-click.directive';
import { OptionHighlightDirective } from './option-highlight/option-highlight.directive';
import { SBiometricsDirective } from 'src/common/directives/s-analytics/s-biometrics.directive';
import { SFormDirective } from 'src/common/directives/s-analytics/s-form.directive';

@NgModule({
    declarations: [
        MaskDateDirective,
        OffClickDirective,
        OptionHighlightDirective,
        SBiometricsDirective,
        SFormDirective,
        FirstTimeInViewDirective,
    ],
    exports: [
        MaskDateDirective,
        OffClickDirective,
        OptionHighlightDirective,
        SBiometricsDirective,
        SFormDirective,
        FirstTimeInViewDirective,
    ],
})
export class DirectivesModule {}
