import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsComponent } from './news.component';

@NgModule({
    declarations: [NewsComponent],
    exports: [NewsComponent],
    imports: [CommonModule],
})
export class NewsModule {}
