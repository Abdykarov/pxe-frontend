import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlaceloaderComponent } from './placeloader.component';

@NgModule({
    declarations: [PlaceloaderComponent],
    imports: [CommonModule],
    exports: [PlaceloaderComponent],
})
export class PlaceloaderModule {}
