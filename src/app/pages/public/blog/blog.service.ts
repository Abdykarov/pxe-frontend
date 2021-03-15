import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
    IBlog,
    IType,
} from 'src/common/cms/models/blog';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    public getActiveTag$ = (route: ActivatedRoute): Observable<string> => route.params.pipe(map(R.prop('type')));

    public getTypes = (blog: IBlog): IType[] => R.pipe(
        R.prop('articles'),
        R.map(R.prop('type')),
        R.flatten,
        R.uniqBy(R.prop('url')),
    )(blog)
}
