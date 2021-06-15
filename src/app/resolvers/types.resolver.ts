import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BlogService } from 'src/common/cms/services/blog.service';
import { IType } from 'src/common/cms/models/blog';

@Injectable({
    providedIn: 'root',
})
export class TypesResolver implements Resolve<any> {

    constructor(
        private blogService: BlogService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IType[]> {
        return this.blogService.getTypes();
    }
}
