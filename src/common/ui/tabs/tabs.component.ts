import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';
import { IDropdownItem } from 'src/common/ui/dropdown/models/item.model';
import { TabComponent } from './tab.component';

@Component({
    selector: 'lnd-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent
    extends AbstractComponent
    implements AfterContentInit, AfterViewInit
{
    @Output() selectAction: EventEmitter<TabComponent> =
        new EventEmitter<TabComponent>();

    @Input()
    @Output()
    public toggleOverlayerAction: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @ViewChild('tabList', { static: true }) tabList: ElementRef;
    @ViewChildren('tabItem') tabItems: QueryList<ElementRef>;
    @ViewChild('moreItem') moreItem: ElementRef;

    public selectedTab: TabComponent;
    public shownTabsCount = 0;
    public openedDropdownIndex = -1;
    public dropdownItems: Array<IDropdownItem> = [];

    private body = document.getElementById('top');
    private moreItemWidth = 0;
    private tabItemWidths: Array<number> = [];

    ngAfterContentInit() {
        const activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }

        this.dropdownItems = this.tabs.toArray().map((tab) => {
            return <IDropdownItem>{
                label: tab.tabTitle,
                action: () => this.selectTab(tab),
            };
        });
    }

    ngAfterViewInit() {
        const tabsArray = this.tabItems.toArray();
        if (!tabsArray.length) {
            return;
        }

        if (!this.tabItemWidths.length) {
            tabsArray.forEach((tabItem) => {
                this.tabItemWidths.push(this.getElementWidth(tabItem));
            });
        }

        if (!this.moreItemWidth) {
            this.moreItemWidth = this.getElementWidth(this.moreItem);
        }

        this.onResize();
    }

    onResize() {
        setTimeout(() => {
            const tabListWidth = this.getElementWidth(this.tabList);
            let totalWidth = 0;

            if (!this.shouldShowDropdown()) {
                this.shownTabsCount = this.tabs.length;
                return;
            }
            this.shownTabsCount = 0;

            this.tabItemWidths.some((itemWidth, index) => {
                if (totalWidth + itemWidth < tabListWidth) {
                    totalWidth += itemWidth;
                    ++this.shownTabsCount;
                } else {
                    if (totalWidth + this.moreItemWidth >= tabListWidth) {
                        --this.shownTabsCount;
                    }
                    return true;
                }
                return false;
            });
        });
    }

    selectTab(selectedTab: TabComponent) {
        this.tabs.toArray().forEach((tab) => (tab.active = false));

        this.selectedTab = selectedTab;
        selectedTab.active = true;
        this.selectAction.emit(selectedTab);
    }

    filterTabs(index: number): Array<TabComponent> {
        return this.tabs.filter((tab, i) => i > index);
    }

    hideMoreItem(index: number): boolean {
        return (
            !this.shouldShowDropdown() ||
            (this.shownTabsCount &&
                (this.shownTabsCount === this.tabs.toArray().length ||
                    index !== this.shownTabsCount - 1))
        );
    }

    toggleDropdown(index: number) {
        this.openedDropdownIndex =
            this.openedDropdownIndex === index ? -1 : index;
    }

    shouldShowDropdown(): boolean {
        return this.tabs.length > 2;
    }

    private getElementWidth(element: ElementRef): number {
        const nativeEl = element.nativeElement;
        const style =
            nativeEl.currentStyle || window.getComputedStyle(nativeEl);
        return nativeEl.offsetWidth + parseInt(style['margin-right'], 10);
    }
}
