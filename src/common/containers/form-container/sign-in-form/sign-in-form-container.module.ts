import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignInFormContainerComponent } from './sign-in-form-container.component';
import { SignInFormModule } from 'src/common/ui/sign-in/sign-in-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        SignInFormContainerComponent,
    ],
    exports: [
        SignInFormContainerComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SignInFormModule,
    ],
})
export class SignInFormContainerModule {}
