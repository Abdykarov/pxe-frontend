import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { GraphTabsComponent } from './graph-tabs.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

@NgModule({
    declarations: [TabComponent, TabsComponent, GraphTabsComponent],
    exports: [TabComponent, TabsComponent, GraphTabsComponent],
    imports: [ButtonModule, CommonModule, DropdownModule],
})
export class TabsModule {}
