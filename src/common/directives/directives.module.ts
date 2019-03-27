import { NgModule } from '@angular/core';

// own classes
import { OffClickDirective } from './off-click/off-click.directive';


@NgModule({
    declarations: [
        OffClickDirective,
    ],
    exports: [
        OffClickDirective,
    ],
})
export class DirectivesModule {}
