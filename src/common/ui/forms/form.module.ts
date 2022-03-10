import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldComponent } from './field/field.component';

@NgModule({
    declarations: [FieldComponent],
    imports: [CommonModule, FormsModule],
    exports: [FieldComponent],
})
export class FormModule {}
