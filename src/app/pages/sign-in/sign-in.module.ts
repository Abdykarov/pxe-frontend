import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInComponent } from './sign-in.component';
import { SignInFormContainerModule } from 'src/common/containers/form-container/sign-in-form/sign-in-form-container.module';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
    declarations: [
        SignInComponent,
    ],
    exports: [
        SignInComponent,
    ],
    imports: [
        CommonModule,
        SignInFormContainerModule,
        SignInRoutingModule,
    ],
})
export class SignInModule { }
