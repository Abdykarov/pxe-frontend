import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    QueryList,
} from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';
import { TabComponent } from './tab.component';

@Component({
    selector: 'lnd-graph-tabs',
    templateUrl: './graph-tabs.component.html',
    styleUrls: ['./graph-tabs.component.scss'],
})
export class GraphTabsComponent
    extends AbstractComponent
    implements AfterContentInit
{
    @Input() expanded = false;
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    public selectedTab: TabComponent;

    ngAfterContentInit() {
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(selectedTab: TabComponent) {
        this.tabs.toArray().forEach((tab) => (tab.active = false));

        this.selectedTab = selectedTab;
        selectedTab.active = true;
    }
}
