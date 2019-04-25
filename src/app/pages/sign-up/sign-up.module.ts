import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpFormContainerModule } from 'src/common/containers/form-container/sign-up-form/sign-up-form-container.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-conteiner/supplier-conteiner.module';

@NgModule({
    declarations: [
        SignUpComponent,
    ],
    exports: [
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SignUpFormContainerModule,
        SignUpRoutingModule,
        SupplierContainerModule,
    ],
})
export class SignUpModule { }
