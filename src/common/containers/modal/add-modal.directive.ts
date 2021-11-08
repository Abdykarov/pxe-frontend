import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[lndDynamicModal]',
})
export class AddModalDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
