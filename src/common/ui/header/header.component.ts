import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;

    public signTypeNone = SignType.NONE;
    public loginTypeNone = LoginType.NONE;

    @Input() settings: ISettings;

    @Input() isMenuOpen: boolean;

    @Output()
    public loginAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public homeRedirect: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public signUpAction: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('window:scroll')
    onWindowScroll() {
        if (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop > 5) {
                this.isHeaderSticked = true;
        } else {
                this.isHeaderSticked = false;
        }
    }
}

