import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { UnsubscribeNewsContainerComponent } from './unsubscribe-news-container.component';

@NgModule({
    declarations: [UnsubscribeNewsContainerComponent],
    exports: [UnsubscribeNewsContainerComponent],
    imports: [AlertModule, CommonModule, PlaceloaderModule],
})
export class UnsubscribeNewsContainerModule {}
