import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { DropdownComponent } from 'src/common/ui/dropdown/dropdown.component';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { ISettings } from 'src/app/layouts/models/router-data.model';
import { INavigationMenu } from 'src/common/ui/navigation/models/navigation.model';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AbstractComponent implements OnInit {
    @ViewChild('userProfile')
    public userProfile: DropdownComponent;

    @ViewChild('publicMenu')
    public publicMenu: DropdownComponent;

    @Input()
    public user: IJwtPayload = null;

    @Input()
    public userMenu: INavigationMenu = [];

    @Input()
    public settings: ISettings;

    @Input()
    public isMenuOpen: boolean;

    @Output()
    public coverageMapAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public loginAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public homeRedirect: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public signUpAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public supplierChangeAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    ngOnInit () {
        super.ngOnInit();
        this.resizeEvent$.subscribe(() => {
            if (this.userProfile && this.userProfile.isOpen) {
                this.userProfile.toggle();
            }
            if (this.publicMenu && this.publicMenu.isOpen) {
                this.publicMenu.toggle();
            }
        });
    }
}
