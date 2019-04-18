import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
    declarations: [
        SignInComponent,
    ],
    imports: [
        CommonModule,
        SignInRoutingModule,
    ],
})
export class SignInModule { }
