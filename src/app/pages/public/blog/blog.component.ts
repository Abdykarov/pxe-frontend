import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { ActivatedRoute } from '@angular/router';
import {IBlog} from 'src/common/cms/models/blog';

@Component({
    selector: 'lnd-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
    public readonly blog: IBlog = this.route.snapshot.data.blog;

    constructor(
        private route: ActivatedRoute,
    ) {}
}
