import {
    Component,
     ViewEncapsulation,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IReference } from 'src/common/containers/carousels-container/models/models';

@Component({
    selector: 'pxe-carousel-references',
    styleUrls: ['carousel-references.component.scss'],
    templateUrl: './carousel-references.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselReferencesComponent extends AbstractComponent {

    constructor() {
        super();
    }

    public maxHeight = null;

    public readonly carouselItems: IReference[] = [
        {
            title: 'Nejdříve se seznámíme2',
            city: 'mesto2',
            name: 'name2',
            iconAlt: 'url2',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
        {
            title: 'Stěhovala jsem se a parc4u to za mě vyřídil. Já si v klidu vybrala koberec a záclony. To mě baví víc.',
            city: 'Liberec',
            name: 'Aneta',
            iconAlt: 'url',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
        {
            title: 'Nejdříve se seznámíme3',
            city: 'mesto3',
            name: 'name3',
            iconAlt: 'url3',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
        {
            title: 'Nejdříve se seznámíme4',
            city: 'mesto4',
            name: 'name4',
            iconAlt: 'url4',
            iconUrl: '/assets/images/landing-page/testASD.png',
        },
    ];

    public maxHeightChangeAction = (maxHeight: number) => this.maxHeight = maxHeight;
}
