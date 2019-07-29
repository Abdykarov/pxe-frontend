import {
    Component,
    Input,
} from '@angular/core';

import { config } from 'src/common/containers/news-conteiner/news-container.config';
import { INews } from 'src/common/ui/news/model/news.model';

@Component({
    selector: 'pxe-news-container',
    templateUrl: './news-container.component.html',
    styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {
    @Input()
    public config: INews = config;
}
