import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own components
import { DropdownComponent } from './dropdown.component';

// own modules
import { DirectivesModule } from 'src/common/directives/directives.module';

@NgModule({
    declarations: [
        DropdownComponent,
    ],
    imports: [
        CommonModule,
        DirectivesModule,
    ],
    exports: [
        DropdownComponent,
    ],
})
export class DropdownModule {}
