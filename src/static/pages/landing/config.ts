import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

export const carouselItems: ICarouselItem[] = [
    {
        title: 'Nejdříve se seznámíme',
        label: 'Představíte nám vaše odběrné místo a základní informace o vaší aktuální smlouvě s dodavatelem.',
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
        title: 'Vyberete si a podepíšete smlouvu',
        label: 'Nejlákavější nabídku potvrdíte jedním kliknutím, doplníte nám základní informace o majiteli odběrného místa a smlouvu online podepíšete.',
        alt: 'carousel obrázek - skvělý přehled',
        src: '/assets/images/landing-page/laptop-overview.png',
    },
];

export const interval = 5000;
