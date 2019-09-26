import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import {
    INavigationConfig,
    INavigationItem,
} from './models/navigation.model';

@Component({
    selector: 'lnd-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    @Input()
    public activeUrl = '';

    @Input()
    public config: INavigationConfig;

    @Input()
    public isMenuOpen: boolean;

    @Input()
    public itemOpened: INavigationItem;

    @Output()
    public openItem: EventEmitter<INavigationItem> = new EventEmitter<INavigationItem>();

    public callOpenItem (itemClicked) {
        this.openItem.emit(itemClicked === this.itemOpened ? null : itemClicked);
    }
}