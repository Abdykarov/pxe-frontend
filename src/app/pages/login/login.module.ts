import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginFormModule } from 'src/common/containers/form-container/login-form/login-form.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        FormModule,
        CommonModule,
        LoginFormModule,
        LoginRoutingModule,
        ModalModule,
        LayoutContainerModule,
        ReactiveFormsModule,
    ],
})
export class LoginModule {}
