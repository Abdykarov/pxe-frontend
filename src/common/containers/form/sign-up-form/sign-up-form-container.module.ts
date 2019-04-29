import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpFormContainerComponent } from './sign-up-form-container.component';
import { SignUpFormModule } from 'src/common/ui/sign-up/sign-up-form.module';

@NgModule({
    declarations: [
        SignUpFormContainerComponent,
    ],
    exports: [
        SignUpFormContainerComponent,
    ],
    imports: [
        CommonModule,
        SignUpFormModule,
    ],
})
export class SignUpFormContainerModule {}
