import { Component } from '@angular/core';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';

@Component({
    templateUrl: './page.html',
})
export class RequestBannerPageComponent {
    public bannerTitle = 'Momentálně nemáte žádné rozpracované žádosti';
    public bannerDescription =
        'Ale pro toto odběrné místo končí v následujících 2 měsících dodávka energie.';

    public buttonLabel = 'Nová poptávka';

    public bannerObj: IBannerObj = {
        linkValue: '/basic/request-banner',
        text: 'BYT Babička, Praha – můžete získat již od 520 Kč',
    };
}
