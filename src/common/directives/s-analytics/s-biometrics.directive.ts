import { Directive, HostListener } from '@angular/core';
import { SAnalyticsService } from 'src/common/services/s-analytics.service';

@Directive({
    selector: '[lndSBiometricsDirective]',
})
export class SBiometricsDirective {
    @HostListener('keydown', ['$event']) keydown = (event: any) =>
        this.sAnalyticsService.sBioKeyDown(event);

    @HostListener('keyup', ['$event']) keyup = (event: any) =>
        this.sAnalyticsService.sBioKeyUp(event);

    @HostListener('focus', ['$event']) focus = (event: any) =>
        this.sAnalyticsService.sBioFocus(event);

    @HostListener('blur', ['$event']) blur = (event: any) =>
        this.sAnalyticsService.sBioBlur(event);

    constructor(private sAnalyticsService: SAnalyticsService) {}
}
