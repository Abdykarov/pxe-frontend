import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class SamplePointsBannerPageComponent {
    public bannerTitle = 'Zatím nemáte uložené žádné odběrné místo';
    
    public bannerDescription = 'Zadejte odběrné místo a my vám hned dáme nabídky';

    public buttonLabel = 'Zadat odběrné místo';

    public clicked = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
