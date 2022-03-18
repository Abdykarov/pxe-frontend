import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PricesFormComponent } from './prices-form.component';

@NgModule({
    declarations: [PricesFormComponent],
    exports: [PricesFormComponent],
    imports: [
        CommonModule,
        AlertModule,
        ButtonModule,
        DirectivesModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class PricesFormModule {}
