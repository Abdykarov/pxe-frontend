import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// own modules
import { ButtonModule } from '../button/button.module';
// own compoents
import { CardComponent } from './card.component';

@NgModule({
    declarations: [CardComponent],
    imports: [ButtonModule, CommonModule, RouterModule],
    exports: [CardComponent],
})
export class CardModule {}
