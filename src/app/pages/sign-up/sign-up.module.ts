import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpFormModule } from 'src/common/containers/form/forms/sign-up/sign-up-form.module';
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
        SignUpFormModule,
        SignUpRoutingModule,
        SupplierContainerModule,
    ],
})
export class SignUpModule { }
