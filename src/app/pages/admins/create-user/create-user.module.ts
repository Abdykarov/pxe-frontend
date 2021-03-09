import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { CreateUserComponent } from './create-user.component';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        CreateUserComponent,
    ],
    imports: [
        CreateUserRoutingModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        ProgressBarModule,
        RouterModule,
    ],
})
export class CreateUserModule { }
