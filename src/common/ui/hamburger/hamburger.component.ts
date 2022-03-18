import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pxe-hamburger',
    templateUrl: './hamburger.component.html',
    styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
    @Input()
    public isMenuOpen = false;

    @Input()
    public disableAction = false;

    @Output()
    public toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
}
