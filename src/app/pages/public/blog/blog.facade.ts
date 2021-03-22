import { Injectable } from '@angular/core';

import * as R from 'ramda';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    IArticle,
    IBlog,
    IType,
} from 'src/common/cms/models/blog';
import { IRouterParams } from './blog.model';
import { ISeo } from 'src/common/cms/models/seo';

@Injectable({
    providedIn: 'root',
})
export class BlogFacade {
    public readonly breadcrumbDefault: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: '',
        },
    ];

    public activeArticleSubject$: BehaviorSubject<IArticle> = new BehaviorSubject(null);
    public activeArticlesSubject$: BehaviorSubject<IArticle[]> = new BehaviorSubject(null);
    public activeTypeSubject$: BehaviorSubject<IType> = new BehaviorSubject(null);
    public blogSubject$: BehaviorSubject<IBlog> = new BehaviorSubject(null);
    public blogTypesSubject$: BehaviorSubject<IType[]> = new BehaviorSubject(null);
    public breadcrumbSubject$: BehaviorSubject<IBreadcrumbItems> = new BehaviorSubject(null);
    public routerParamsSubject$: BehaviorSubject<IRouterParams> = new BehaviorSubject(null);
    public isDetailSubject$: BehaviorSubject<boolean> = new BehaviorSubject(null);

    public activeArticle$ = this.activeArticleSubject$.asObservable();
    public activeArticles$ = this.activeArticlesSubject$.asObservable();
    public activeType$ = this.activeTypeSubject$.asObservable();
    public blog$ = this.blogSubject$.asObservable();
    public blogTypes$ = this.blogTypesSubject$.asObservable();
    public breadcrumb$ = this.breadcrumbSubject$.asObservable();
    public routerParams$ = this.routerParamsSubject$.asObservable();
    public isDetail$ = this.isDetailSubject$.asObservable();

    constructor(
        private metaService: Meta,
        private titleService: Title,
    ) {
        combineLatest([this.routerParams$, this.blog$])
            .subscribe(([params, blog]) => {
                if (!params?.type || !blog) {
                    return;
                }
                const url = params?.type;
                const isDetail = !!params?.article;
                this.isDetailSubject$.next(isDetail);
                const types = this.getTypes(blog);
                this.setTypes(types);
                this.setActiveType(types, url);
                this.setActiveArticles();
                if (isDetail) {
                    this.setActiveArticle();
                }
                this.setBreadcrumb();
                this.setSeo();
            });
    }

    private getTypes = (blog: IBlog): IType[] => R.pipe(
        R.prop('articles'),
        R.map(R.prop('type')),
        R.flatten,
        R.uniqBy(R.prop('url')),
        R.sortBy(R.prop('order')),
    )(blog)

    private setActiveType = (types: IType[], url: string): void => {
        const activeType = R.find(R.propEq('url', url))(types);
        this.activeTypeSubject$.next(activeType);
    }

    public getSeoByActiveTag = (type: string, activeTypes: IType[]) => R.pipe(
        R.find(R.propEq('url', type)),
        R.prop('seo'),
        R.head,
    )(activeTypes)

    private setActiveArticles = (): void => {
        const { url } = this.activeTypeSubject$.getValue();
        const blog = this.blogSubject$.getValue();

        const activeArticles = R.pipe(
            R.prop('articles'),
            R.filter(R.pipe(R.prop('type'), R.find(R.propEq('url', url)))),
        )(blog);

        this.activeArticlesSubject$.next(activeArticles);
    }

    private setTypes = (types: IType[]): void => this.blogTypesSubject$.next(types);

    private setBreadcrumb = (): void => {
        const isDetail = this.isDetailPage();
        if (isDetail) {
            const activeArticle = this.activeArticleSubject$.getValue();
            const activeType: IType = this.activeTypeSubject$.getValue();
            const breadcrumbDefaultCopy = [...this.breadcrumbDefault];
            breadcrumbDefaultCopy[1] = {
                label: activeType.label,
                url: activeType.url,
            };
            breadcrumbDefaultCopy.push({
                label: activeArticle.header,
            });
            this.breadcrumbSubject$.next(breadcrumbDefaultCopy);
        } else {
            const activeType: IType = this.activeTypeSubject$.getValue();
            const breadcrumbDefaultCopy = [...this.breadcrumbDefault];
            breadcrumbDefaultCopy[1] = {
                ...this.breadcrumbDefault[1],
                label: activeType.label,
            };
            this.breadcrumbSubject$.next(breadcrumbDefaultCopy);
        }
    }

    private setActiveArticle = (): void => {
        const activeArticleParam = this.routerParamsSubject$.getValue().article;
        const activeArticles = this.activeArticlesSubject$.getValue();

        const activeArticle = R.find(
            R.propEq('url', activeArticleParam),
        )(activeArticles);
        this.activeArticleSubject$.next(activeArticle);
    }

    private setSeo = (): void => {
        const isDetail = this.isDetailPage();
        const seo = isDetail ? this.getSeoDetail() : this.getSeoOverview();

        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });
    }

    private getSeoOverview = (): ISeo => R.pipe(R.prop('seo'), R.head)(this.activeTypeSubject$.getValue());

    private getSeoDetail = (): ISeo => {
        const activeArticle = this.activeArticleSubject$.getValue();

        return R.pipe(
            R.prop('seo'),
            R.head,
        )(activeArticle);
    }

    private isDetailPage = (): boolean => this.isDetailSubject$.getValue();
}
