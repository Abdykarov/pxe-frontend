import { Component, Input } from '@angular/core';

@Component({
    selector: 'lnd-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
    @Input() tabTitle: string;
    @Input() tabDescription: string;
    @Input() active = false;
    @Input() disabled = false;
    @Input() id?: string;
}
