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
            label: 'Představíte sebe i vaše odběrné místo nebo nahrajete fakturu, ať máme potřebné informace.',
            alt: 'carousel obrázek - drag and drop funkce',
            src: '/assets/images/landing-page/laptop-dragdrop.png',
        },
        {
            title: 'Dostanete nabídky',
            label: 'Získáme pro vás ty nejzajímavější nabídky od dodavatelů, které před tím důkladně prověříme, ať se nemusíte ničeho bát.',
            alt: 'carousel obrázek - zajímavé nabídky',
            src: '/assets/images/landing-page/laptop-offers.png',
        },
        {
            title: 'Vyberete si a je to',
            label: 'Nejlákavější nabídku potvrdíte jedním kliknutím a potřebný převod už za vás zařídíme my.',
            alt: 'carousel obrázek - skvělý přehled',
            src: '/assets/images/landing-page/laptop-overview.png',
        },
    ];

    public readonly intervalBetweenSliders = 5000;
}
