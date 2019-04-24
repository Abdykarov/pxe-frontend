import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SignUpFormContainerComponent } from './sign-up-form-container.component';
import { SignUpFormModule } from 'src/common/ui/sign-up/sign-up-form.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-conteiner/supplier-conteiner.module';

@NgModule({
    declarations: [
        SignUpFormContainerComponent,
    ],
    exports: [
        SignUpFormContainerComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SignUpFormModule,
        SupplierContainerModule,
    ],
})
export class SignUpFormContainerModule {}
