import {
    Component,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AbstractComponent } from 'src/common/abstract.component';
import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'pxe-carousel-container',
    templateUrl: './carousel-container.component.html',
})
export class CarouselContainerComponent extends AbstractComponent {
    public isBrowser = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isBrowser = true;
        }
    }

    public readonly carouselItems: ICarouselItem[] = [
        {
            title: 'Nejdříve se seznámíme',
            label: 'Představíte nám vaše odběrné místo a základní informace o vaší aktuální smlouvě s dodavatelem.',
            alt: 'carousel obrázek - Nejdříve se seznámíme',
            src: '/assets/images/landing-page/laptop-supply-point.png',
        },
        {
            title: 'Dostanete nabídky',
            label: 'Získáme pro vás ty nejzajímavější nabídky od dodavatelů, které před tím důkladně prověříme, ať se nemusíte ničeho bát.',
            alt: 'carousel obrázek - Dostanete nabídky',
            src: '/assets/images/landing-page/laptop-offers.png',
        },
        {
            title: 'Vyberete si a podepíšete smlouvu',
            label: 'Nejlákavější nabídku potvrdíte jedním kliknutím, doplníte nám' +
                ' základní informace o majiteli odběrného místa a smlouvu online podepíšete.',
            alt: 'carousel obrázek - Vyberete si a podepíšete smlouvu',
            src: '/assets/images/landing-page/laptop-payment.png',
        },
    ];

    public readonly intervalBetweenSliders = 5000;
}
