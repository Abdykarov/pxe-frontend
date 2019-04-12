import {
    Component,
    HostListener,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { ScrollRegisterService } from 'src/app/layouts/public/services/scroll-register';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;

    @Input() isPublic = false;

    @Input() isMenuOpen: boolean;

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

    scrollToNewSubscription() {
        this.scrollRegisterService.clickedOnRegistration();
    }

    constructor(
        private scrollRegisterService: ScrollRegisterService,
    ) {}
}
