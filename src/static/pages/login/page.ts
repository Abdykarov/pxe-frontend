import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { SupplierComponent } from '../../../common/ui/supplier/supplier.component';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

@Component({
    templateUrl: './page.html',
})

export class LoginPageComponent {
    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

    public configSupplier: ISupplier[] = [
        {
            alt: 'logo - Alpiq CZ',
            logoUrl: '/assets/images/suppliers/logo_alpiq.svg',
            logoUrlHover: '/assets/images/suppliers/logo_alpiq-hover.svg',
            supplierUrl: '',
            title: 'Alpiq CZ',
        },
        {
            alt: 'logo - Amper Market, a.s.',
            logoUrl: '/assets/images/suppliers/logo_ampermarket@2x.png',
            logoUrlHover: '/assets/images/suppliers/logo_ampermarket@2x-hover.png',
            supplierUrl: '',
            title: 'Amper Market, a.s.',
        },
        {
            alt: 'logo - Bohemia Energy entity s.r.o.',
            logoUrl: '/assets/images/suppliers/logo_bohemia-energy.svg',
            logoUrlHover: '/assets/images/suppliers/logo_bohemia-energy-hover.svg',
            supplierUrl: '',
            size: 'sm',
            title: 'Bohemia Energy entity s.r.o.',
        },
        {
            alt: 'logo - ČEZ, a.s.',
            logoUrl: '/assets/images/suppliers/logo_cez-group.svg',
            logoUrlHover: '/assets/images/suppliers/logo_cez-group-hover.svg',
            supplierUrl: '',
            title: 'ČEZ, a.s.',
        },
        {
            alt: 'logo - Skupina E.ON',
            logoUrl: '/assets/images/suppliers/logo_eon.svg',
            logoUrlHover: '/assets/images/suppliers/logo_eon-hover.svg',
            supplierUrl: '',
            size: 'sm',
            title: 'Skupina E.ON',
        },
        {
            alt: 'logo - EP Energy Trading a.s.',
            logoUrl: '/assets/images/suppliers/logo_ep-energy-trading.svg',
            logoUrlHover: '/assets/images/suppliers/logo_ep-energy-trading-hover.svg',
            supplierUrl: '',
            title: 'EP Energy Trading a.s.',
        },
        {
            alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
            logoUrl: '/assets/images/suppliers/logo_carbounion-bohemia@2x.png',
            logoUrlHover: '/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png',
            supplierUrl: '',
            size: 'xl',
            title: 'CARBOUNION BOHEMIA, spol. s r. o.',
        },
        {
            alt: 'logo - MND a.s.',
            logoUrl: '/assets/images/suppliers/logo_mnd.svg',
            logoUrlHover: '/assets/images/suppliers/logo_mnd-hover.svg',
            supplierUrl: '',
            size: 'sm',
            title: 'MND a.s.',
        },
        {
            alt: 'logo - LUMIUS, spol s.r.o.',
            logoUrl: '/assets/images/suppliers/logo_lumius@2x.png',
            logoUrlHover: '/assets/images/suppliers/logo_lumius@2x-hover.png',
            supplierUrl: '',
            title: 'LUMIUS, spol s.r.o.',
        },
        {
            alt: 'logo - Nano Energies a. s.',
            logoUrl: '/assets/images/suppliers/logo_nano-energies.svg',
            logoUrlHover: '/assets/images/suppliers/logo_nano-energies-hover.svg',
            supplierUrl: '',
            title: 'Nano Energies a. s.',
        },
        {
            alt: 'logo - Pražská plynárenská a.s.',
            logoUrl: '/assets/images/suppliers/logo_prazska-plynarenska.svg',
            logoUrlHover: '/assets/images/suppliers/logo_prazska-plynarenska-hover.svg',
            supplierUrl: '',
            title: 'Pražská plynárenská a.s.',
        },
        {
            alt: 'logo - Pražská energetika, a.s.',
            logoUrl: '/assets/images/suppliers/logo_prazska-energetika.svg',
            logoUrlHover: '/assets/images/suppliers/logo_prazska-energetika-hover.svg',
            supplierUrl: '',
            title: 'Pražská energetika, a.s.',
        },
        {
            alt: 'logo - Slovenské elektrárne, a. s.',
            logoUrl: '/assets/images/suppliers/logo_slovenske-elektrarne.svg',
            logoUrlHover: '/assets/images/suppliers/logo_slovenske-elektrarne-hover.svg',
            supplierUrl: '',
            size: 'xl',
            title: 'Slovenské elektrárne, a. s.',
        },
        {
            alt: 'logo - Skupina Veolia',
            logoUrl: '/assets/images/suppliers/logo_veolia.svg',
            logoUrlHover: '/assets/images/suppliers/logo_veolia-hover.svg',
            supplierUrl: '',
            title: 'Skupina Veolia',
        },
    ];

    public action = (evt) => {
        evt.preventDefault();
        window.open('/full/landing-page', '_blank');
    }
}
