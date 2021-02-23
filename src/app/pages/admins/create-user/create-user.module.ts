import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateUserRoutingModule } from './create-user-routing.module';
import { CreateUserComponent } from './create-user.component';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        CreateUserComponent,
    ],
    imports: [
        CreateUserRoutingModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        TableModule,
    ],
})
export class CreateUserModule { }
