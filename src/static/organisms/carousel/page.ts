import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ISupplierLogo } from 'src/common/ui/carousels/models/models';

@Component({
    templateUrl: './page.html',
})
export class CarouselComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public supplierLogos: ISupplierLogo[] = [
        {
            alt: 'logo - Alpiq CZ',
            logoUrl: '/assets/images/suppliers/logo_alpiq-white.svg',
            title: 'Alpiq CZ',
            faqUrl: '/faq/supplier/alpiq',
            width: 79,
        },
        {
            alt: 'logo - Bohemia Energy entity s.r.o.',
            logoUrl: '/assets/images/suppliers/logo_bohemia-energy-white.svg',
            title: 'Bohemia Energy entity s.r.o.',
            width: 108,
            faqUrl: '/faq/supplier/bohemia-energy',
        },
        {
            alt: 'logo - EP Energy Trading a.s.',
            logoUrl:
                '/assets/images/suppliers/logo_ep-energy-trading-white.svg',
            title: 'EP Energy Trading a.s.',
            width: 80,
            faqUrl: '/faq/supplier/energy-trading',
        },
        {
            alt: 'logo - Yello Energy',
            logoUrl: '/assets/images/suppliers/logo_yello-energy-white.svg',
            title: 'Yello Energy',
            width: 35,
            faqUrl: '/faq/supplier/carbounion',
        },
        {
            alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
            logoUrl:
                '/assets/images/suppliers/logo_carbounion-bohemia-white.svg',
            title: 'CARBOUNION BOHEMIA, spol. s r. o.',
            width: 50,
            faqUrl: '/faq/supplier/yello-energy',
        },
        {
            alt: 'logo - Pražská plynárenská a.s.',
            logoUrl:
                '/assets/images/suppliers/logo_prazska-plynarenska-white.svg',
            title: 'Pražská plynárenská a.s.',
            width: 103,
            faqUrl: '/faq/supplier/prazska-plynarenska',
        },
    ];

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Carousels',
                url: null,
            },
        ];
    }
}
