import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';
import { IReference } from 'src/common/ui/carousels/models/models';

@Component({
    selector: 'pxe-carousel-references',
    styleUrls: ['carousel-references.component.scss'],
    templateUrl: './carousel-references.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselReferencesComponent extends AbstractComponent {
    public readonly width = 106;
    public readonly height = 106;

    public maxHeight = null;

    @Input()
    public carouselItems: IReference[] = [];

    public maxHeightChangeAction = (maxHeight: number) =>
        (this.maxHeight = maxHeight);
}
