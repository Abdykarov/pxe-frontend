import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IType } from 'src/common/cms/models/blog';
import { BlogService } from 'src/common/cms/services/blog.service';

@Injectable({
    providedIn: 'root',
})
export class TypesResolver implements Resolve<any> {
    constructor(private blogService: BlogService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IType[]> {
        return this.blogService.getTypes();
    }
}
