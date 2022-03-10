import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { HamburgerModule } from 'src/common/ui/hamburger/hamburger.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { NavigationModule } from '../navigation/navigation.module';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
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
