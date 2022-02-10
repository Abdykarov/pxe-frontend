import { Directive, HostListener } from '@angular/core';
import { SAnalyticsService } from 'src/common/services/s-analytics.service';

@Directive({
    selector: '[lndSFormDirective]',
})
export class SFormDirective {
    @HostListener('change', ['$event']) change = (event: any) =>
        this.sAnalyticsService.sFormChange(event);

    @HostListener('focus', ['$event']) focus = (event: any) =>
        this.sAnalyticsService.sFormFocus(event);

    @HostListener('blur', ['$event']) blur = (event: any) =>
        this.sAnalyticsService.sFormBlur(event);

    constructor(private sAnalyticsService: SAnalyticsService) {}
}
