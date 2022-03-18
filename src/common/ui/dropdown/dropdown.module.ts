import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// own modules
import { DirectivesModule } from 'src/common/directives/directives.module';
// own components
import { DropdownComponent } from './dropdown.component';

@NgModule({
    declarations: [DropdownComponent],
    imports: [CommonModule, DirectivesModule],
    exports: [DropdownComponent],
})
export class DropdownModule {}
