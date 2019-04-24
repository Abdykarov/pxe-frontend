import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignUpComponent } from './sign-up.component';
import { SignUpFormContainerModule } from 'src/common/containers/form-container/sign-up-form/sign-up-form-container.module';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
    declarations: [
        SignUpComponent,
    ],
    exports: [
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        SignUpFormContainerModule,
        SignUpRoutingModule,
    ],
})
export class SignUpModule { }
