import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpFormComponent } from './sign-up-form.component';
import { SignUpModule } from 'src/common/ui/sign-up/sign-up.module';

@NgModule({
    declarations: [
        SignUpFormComponent,
    ],
    exports: [
        SignUpFormComponent,
    ],
    imports: [
        CommonModule,
        SignUpModule,
    ],
})
export class SignUpFormModule {}
