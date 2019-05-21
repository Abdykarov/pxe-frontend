import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { INavigationMenu } from 'src/common/ui/navigation/models/navigation.model';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public signTypeNone = SignType.NONE;
    public loginTypeNone = LoginType.NONE;

    @ViewChild('userProfile')
    public userProfile: DropdownComponent;

    @Input()
    public resizeEvent$: any = new EventEmitter();

    @Input()
    public user: IJwtPayload = null;

    @Input()
    public userMenu: INavigationMenu = [];

    @Input()
    public settings: ISettings;

    @Input()
    public isMenuOpen: boolean;

    @Output()
    public loginAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public homeRedirect: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public signUpAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit () {
        this.resizeEvent$.subscribe(() => {
            if (this.userProfile.isOpen) {
                this.userProfile.toggle();
                this.cd.markForCheck();
            }
        });
    }
}
