import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SignInFormContainerComponent } from './sign-in-form-container.component';
import { SignInFormModule } from 'src/common/ui/sign-in/sign-in-form.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-conteiner/supplier-conteiner.module';

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
        SupplierContainerModule,
    ],
})
export class SignInFormContainerModule {}
