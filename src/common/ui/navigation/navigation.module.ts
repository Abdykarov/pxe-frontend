import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation.component';
import { PipesModule } from 'src/common/pipes/common/pipes.module';

@NgModule({
    declarations: [
        NavigationComponent,
    ],
    exports: [
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
    ],
})
export class NavigationModule {}
