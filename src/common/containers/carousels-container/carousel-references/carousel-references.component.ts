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
    public isBrowser = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
        }
    }

    public readonly carouselItems: IReference[] = [
        {
            title: 'Stěhovala jsem se a parc4u to za mě vyřídil. Já si v klidu vybrala koberec a záclony. To mě baví víc.',
            city: 'Liberec',
            name: 'Aneta',
            iconUrl: 'url',
        },
        {
            title: 'Nejdříve se seznámíme2',
            city: 'mesto2',
            name: 'name2',
            iconUrl: 'url2',
        },
    ];
}
