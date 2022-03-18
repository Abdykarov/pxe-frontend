import { Component } from '@angular/core';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { configStepper } from './config';

@Component({
    templateUrl: './page.html',
    styleUrls: ['../../../assets/scss/05_pages/payment-verification.scss'],
})
export class PaymentVerificationPageComponent {
    public stepperProgressConfig = configStepper;
    public showPaymentInfo = true;

    public bannerType = BannerTypeImages;
    public bannerTitle =
        'Nyní potřebujeme ověřit vaši totožnost pomocí tzv. mikrotransakce nebo&#8209;li ověřovací platby.';
    public bannerDescription =
        '<p>Na doručení této ověřovací platby čekáme do 15.11.2018, proto ji odešlete raději hned teď.' +
        'Platba u nás může být během chvíle, ale z některé banky to může trvat až 3 dny a&nbsp;my vás nechceme zdržovat.</p>' +
        '<p>Okno aplikace můžete nyní zavřít a až platbu obdržíme, dáme vám vědět na e-mail.</p>';
}
