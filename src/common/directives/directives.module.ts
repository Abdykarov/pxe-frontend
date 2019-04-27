import { NgModule } from '@angular/core';

import { MaskDateDirective } from './datepicker/datepicker.directive';
import { OffClickDirective } from './off-click/off-click.directive';

@NgModule({
    declarations: [
        MaskDateDirective,
        OffClickDirective,
    ],
    exports: [
        MaskDateDirective,
        OffClickDirective,
    ],
})
export class DirectivesModule {}
