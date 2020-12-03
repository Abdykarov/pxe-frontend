import {
    Component,
    Inject,
    PLATFORM_ID, ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AbstractComponent } from 'src/common/abstract.component';
import { IReference } from 'src/common/containers/carousels-container/models/models';

@Component({
    selector: 'pxe-carousel-references',
    styleUrls: ['carousel-references.component.scss'],
    templateUrl: './carousel-references.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselReferencesComponent extends AbstractComponent {

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
        }
    }
    public isBrowser = false;

    public maxHeight = 0;

    public readonly carouselItems: IReference[] = [
        {
            title: 'Stěhovala jsem se a parc4u to za mě vyřídil. Já si v klidu vybrala koberec a záclony. To mě baví víc.',
            city: 'Liberec',
            name: 'Aneta',
            iconAlt: 'url',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
        {
            title: 'Nejdříve se seznámíme2',
            city: 'mesto2',
            name: 'name2',
            iconAlt: 'url2',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
    ];

    public maxHeightChange = (maxHeight: number) => this.maxHeight = maxHeight;
}
