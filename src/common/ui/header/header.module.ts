import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { HeaderComponent } from './header.component';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    exports: [
        HeaderComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        RouterModule,
        TypeaheadModule,
    ],
})
export class HeaderModule {}
