import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
    declarations: [NavigationComponent],
    exports: [NavigationComponent],
    imports: [CommonModule, RouterModule, PipesModule],
})
export class NavigationModule {}
