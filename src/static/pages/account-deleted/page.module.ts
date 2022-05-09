import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { SignType } from 'src/app/layouts/models/router-data.model';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { AccountDeletedComponent } from './page';

@NgModule({
    declarations: [AccountDeletedComponent],
    exports: [AccountDeletedComponent],
    imports: [
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        VerificationFormModule,
    ],
})
export class AccountDeletedPageModule {}

export const accountDeletedPageRoutes: Routes = [
    {
        path: 'account-deleted',
        component: AccountDeletedComponent,
        data: {
            isPublic: true,
            signUpType: SignType.STATIC,
        },
    },
];
