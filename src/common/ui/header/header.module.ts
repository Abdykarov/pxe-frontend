import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { HamburgerModule } from 'src/common/ui/hamburger/hamburger.module';
import { HeaderComponent } from './header.component';
import { NavigationModule } from '../navigation/navigation.module';

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
        HamburgerModule,
        RouterModule,
        NavigationModule,
    ],
})
export class HeaderModule {}
