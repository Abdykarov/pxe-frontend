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
    public readonly width = 106;
    public readonly height = 106;

    public maxHeight = null;

    public readonly carouselItems: IReference[] = [
        {
            title: 'Jsem ráda, že ty malý záludný písmenka ve smlouvách čte někdo, kdo se v tom vyzná a pohlídá je.',
            city: 'Praha',
            name: 'Jarka',
            iconAlt: 'Jarka, Praha',
            iconUrl: '/assets/images/landing-page/jarka-praha.png',
        },
        {
            title: ' Stačilo naklikat pár údajů a nový nájemník se mohl začít stěhovat (a ten starý naštěstí taky).',
            city: 'Brno',
            name: 'Jiří',
            iconAlt: 'Jiří, Brno',
            iconUrl: '/assets/images/landing-page/jiri-brno.png',
        },
        {
            title: 'Letos jsme přes parc4u změnili smlouvu a celý dům slušně ušetřil.',
            city: 'Písek',
            name: 'Josef',
            iconAlt: 'Josef, Písek',
            iconUrl: '/assets/images/landing-page/josef-pisek.png',
        },
        {
            title: 'Myslím na to, v čem budou žít mé děti a vnoučata. Proto jsem si vybrala čistou cestu.',
            city: 'Brno',
            name: 'Blanka',
            iconAlt: 'Blanka, Brno',
            iconUrl: '/assets/images/landing-page/blanka-brno.png',
        },
    ];

    public maxHeightChangeAction = (maxHeight: number) => this.maxHeight = maxHeight;
}
