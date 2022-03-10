import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [ProgressBarComponent],
    exports: [ProgressBarComponent],
    imports: [CommonModule, PipesModule, RouterModule],
})
export class ProgressBarModule {}
