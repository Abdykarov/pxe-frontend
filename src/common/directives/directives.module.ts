import { NgModule } from '@angular/core';

import { MaskDateDirective } from './datepicker/datepicker.directive';
import { OffClickDirective } from './off-click/off-click.directive';
import { SBiometricsDirective } from 'src/common/directives/s-analytics/s-biometrics.directive';
import { SFormDirective } from 'src/common/directives/s-analytics/s-form.directive';

@NgModule({
    declarations: [
        MaskDateDirective,
        OffClickDirective,
        SBiometricsDirective,
        SFormDirective,
    ],
    exports: [
        MaskDateDirective,
        OffClickDirective,
        SBiometricsDirective,
        SFormDirective,
    ],
})
export class DirectivesModule {}
