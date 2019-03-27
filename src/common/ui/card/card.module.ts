import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own compoents
import { CardComponent } from './card.component';

// own modules
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        CardComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
    exports: [
        CardComponent,
    ],
})
export class CardModule {}
