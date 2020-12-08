import {
    Component,
    Inject,
    PLATFORM_ID, ViewEncapsulation,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { config } from './carousel-suppliers.config';
import { IReference } from 'src/common/containers/carousels-container/models/models';

@Component({
    selector: 'pxe-carousel-suppliers',
    styleUrls: ['carousel-suppliers.component.scss'],
    templateUrl: './carousel-suppliers.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselSuppliersComponent extends AbstractComponent {

    public config = [
        {
            alt: 'logo - Alpiq CZ',
            logoUrl: '/assets/images/suppliers/logo_alpiq-hover.svg',
            logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
            supplierUrl: '',
            title: 'Alpiq CZ',
            width: 81,
            faqUrl: '/faq/supplier/alpiq',
        },
        {
            alt: 'logo - Bohemia Energy entity s.r.o.',
            logoUrl: '/assets/images/suppliers/logo_bohemia-energy-hover.svg',
            logoUrlHover: '/assets/images/suppliers/logo_bohemia-energy-hover.svg',
            supplierUrl: '',
            size: 'sm',
            title: 'Bohemia Energy entity s.r.o.',
            width: 185,
            faqUrl: '/faq/supplier/bohemia-energy',
        },
        {
            alt: 'logo - EP Energy Trading a.s.',
            logoUrl: '/assets/images/suppliers/logo_ep-energy-trading-hover.svg',
            logoUrlHover: '/assets/images/suppliers/logo_ep-energy-trading-hover.svg',
            supplierUrl: '',
            title: 'EP Energy Trading a.s.',
            width: 75,
            faqUrl: '/faq/supplier/energy-trading',
        },
        {
            alt: 'logo - Yello Energy',
            logoUrl: '/assets/images/suppliers/logo_yello-energy-hover.svg',
            logoUrlHover: '/assets/images/suppliers/logo_yello-energy-hover.svg',
            supplierUrl: '',
            size: 'xl',
            title: 'Yello Energy',
            width: 56,
            faqUrl: '/faq/supplier/yello-energy',
        },
        {
            alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
            logoUrl: '/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png',
            logoUrlHover: '/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png',
            supplierUrl: '',
            size: 'xl',
            title: 'CARBOUNION BOHEMIA, spol. s r. o.',
            width: 70,
            faqUrl: '/faq/supplier/carbounion',
        },
        {
            alt: 'logo - Pražská plynárenská a.s.',
            logoUrl: '/assets/images/suppliers/logo_prazska-plynarenska-hover.svg',
            logoUrlHover: '/assets/images/suppliers/logo_prazska-plynarenska-hover.svg',
            supplierUrl: '',
            size: 'xl',
            title: 'Pražská plynárenská a.s.',
            width: 134,
            faqUrl: '/faq/supplier/prazska-plynarenska',
        },
    ];

    public maxHeight = 0;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    public maxHeightChange = (maxHeight: number) => this.maxHeight = maxHeight;
}
