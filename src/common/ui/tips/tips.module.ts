import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TipsComponent } from './tips.component';

@NgModule({
    declarations: [TipsComponent],
    imports: [CommonModule],
    exports: [TipsComponent],
})
export class TipsModule {}
