import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordFormModule } from 'src/common/containers/form/forms/change-password/change-password-form.module';
import { LoginSupplyAuthFormModule } from 'src/common/containers/form/forms/login-supply-auth/login-supply-auth-form.module';
import { LoginFormModule } from 'src/common/containers/form/forms/login/login-form.module';
import { ResetPasswordFormModule } from 'src/common/containers/form/forms/reset-password/reset-password-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ReCaptchaModule } from 'src/common/containers/re-captcha/re-captcha.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-container/supplier-conteiner.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';

@NgModule({
    declarations: [LoginComponent],
    exports: [LoginComponent],
    imports: [
        AlertModule,
        ButtonModule,
        FormModule,
        ChangePasswordFormModule,
        CommonModule,
        LayoutContainerModule,
        LoginFormModule,
        LoginRoutingModule,
        LoginSupplyAuthFormModule,
        ModalModule,
        ReactiveFormsModule,
        ReCaptchaModule,
        ResetPasswordFormModule,
        SupplierContainerModule,
    ],
})
export class LoginModule {}
