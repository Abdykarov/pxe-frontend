import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddComponent } from './add.component';

@NgModule({
    declarations: [AddComponent],
    imports: [CommonModule],
    exports: [AddComponent],
})
export class AddModule {}
