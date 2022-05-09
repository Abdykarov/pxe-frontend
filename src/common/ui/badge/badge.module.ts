import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// own components
import { BadgeComponent } from './badge.component';

@NgModule({
    declarations: [BadgeComponent],
    imports: [CommonModule],
    exports: [BadgeComponent],
})
export class BadgeModule {}
