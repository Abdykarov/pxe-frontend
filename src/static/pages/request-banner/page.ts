import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class RequestBannerPageComponent {
    public bannerTitle = 'Momentálně nemáte žádné rozpracované žádosti';
    public bannerDescription = 'Ale pro toto odběrné místo končí v následujících 2 měsících dodávka energie.';

    public buttonLabel = 'Nová poptávka';

    public bannerObj = {
        linkValue: 'basic/request-banner',
        text: 'BYT Babička, Praha – můžete získat již od 520 Kč',
    };
}
