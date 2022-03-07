import { DOCUMENT } from '@angular/common';
import {
    Component,
    HostListener,
    Inject,
    Input,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'lnd-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {
    @Input()
    public isSimpleFooter = false;

    public scrollToTopIsVisible: boolean;
    public year = new Date().getFullYear();

    @HostListener('window:scroll')
    onWindowScroll() {
        if (
            window.pageYOffset ||
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop > 100
        ) {
            this.scrollToTopIsVisible = true;
        } else if (
            (this.scrollToTopIsVisible && window.pageYOffset) ||
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop < 10
        ) {
            this.scrollToTopIsVisible = false;
        }
    }

    constructor(@Inject(DOCUMENT) private document: Document) {}

    public scrollToTop = () => {
        const currentScroll =
            this.document.documentElement.scrollTop ||
            this.document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.scrollToTop);
            window.scrollTo(0, currentScroll - currentScroll / 5);
        }
    };
}
