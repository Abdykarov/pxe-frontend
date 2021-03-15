import {
    Component,
    OnInit,
} from '@angular/core';

import { BlogComponent } from 'src/app/pages/public/blog/blog.component';
import {
    IBlog,
    IType,
} from 'src/common/cms/models/blog';

@Component({
    selector: 'lnd-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    public readonly blog: IBlog;
    public readonly blogTypes: IType[];

    constructor(
        private blogComponent: BlogComponent,
    ) {
        this.blog = blogComponent.blog;
    }

    ngOnInit(): void {
        console.log(JSON.stringify(this.blog));
    }

}
