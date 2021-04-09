import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { AskForOfferContainerComponent } from './ask-for-offer-container.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';

@NgModule({
    declarations: [
        AskForOfferContainerComponent,
    ],
    exports: [
        AskForOfferContainerComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        DirectivesModule,
        FileUploaderModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        LoaderModule,
    ],
})
export class AskForOfferContainerModule {}
