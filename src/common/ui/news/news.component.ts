import {
    Component,
    Input,
} from '@angular/core';

import { INew } from 'src/common/ui/news/model/news.model';

@Component({
    selector: 'pxe-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
    @Input()
    public news: INew[];
}
