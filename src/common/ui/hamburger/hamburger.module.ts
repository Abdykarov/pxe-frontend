import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HamburgerComponent } from 'src/common/ui/hamburger/hamburger.component';

@NgModule({
    declarations: [HamburgerComponent],
    imports: [CommonModule],
    exports: [HamburgerComponent],
})
export class HamburgerModule {}
