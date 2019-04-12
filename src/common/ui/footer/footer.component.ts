import {
    Component,
    Input,
    ViewEncapsulation,
    Inject,
    HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'lnd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
    @Input() isLandingPage = false;

    public scrollToTopIsVisible: boolean;

    @HostListener('window:scroll')
    onWindowScroll() {
        if (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop > 100) {
                this.scrollToTopIsVisible = true;
        } else if (
            this.scrollToTopIsVisible &&
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop < 10) {
                this.scrollToTopIsVisible = false;
            }
    }

    constructor(
        @Inject(DOCUMENT)
        private document: Document,
    ) {}

    public scrollToTop = () => {
        const currentScroll = this.document.documentElement.scrollTop || this.document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.scrollToTop);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
    }
}
