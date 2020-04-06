import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

export const carouselItems: ICarouselItem[] = [
    {
        title: 'Nejdříve se seznámíme',
        label: 'Představíte sebe i vaše odběrné místo nebo nahrajete fakturu, ať máme potřebné informace.',
        alt: 'carousel obrázel - drag and drop funkce',
        src: '/assets/images/landing-page/laptop-dragdrop.png',
    },
    {
        title: 'Dostanete nabídky',
        label: 'Získáme pro vás ty nejzajímavější nabídky od dodavatelů, které před tím důkladně prověříme, ať se nemusíte ničeho bát.',
        alt: 'carousel obrázel - zajímavé nabídky',
        src: '/assets/images/landing-page/laptop-offers.png',
    },
    {
        title: 'Vyberete si a je to',
        label: 'Nejlákavější nabídku potvrdíte jedním kliknutím a potřebný převod už za vás zařídíme my.',
        alt: 'carousel obrázel - skvělý přehled',
        src: '/assets/images/landing-page/laptop-overview.png',
    },
];

export const interval = 0;
