import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { AskForOfferFileUploaderComponent } from './page';

@NgModule({
    declarations: [AskForOfferFileUploaderComponent],
    exports: [AskForOfferFileUploaderComponent],
    imports: [
        AlertModule,
        AskForOfferContainerModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        FileUploaderModule,
        FormModule,
        TableModule,
    ],
})
export class AskForOfferFilePageModule {}

export const askForOfferFilePageRoutes: Routes = [
    {
        path: 'ask-for-offer-file-uploader',
        component: AskForOfferFileUploaderComponent,
    },
];
