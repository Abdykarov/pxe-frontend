import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as R from 'ramda';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';
import { IArticle, IBlog, IType } from 'src/common/cms/models/blog';
import { ISeo } from 'src/common/cms/models/seo';
import { BlogService } from 'src/common/cms/services/blog.service';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IRouterParams } from './blog.model';

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

    public activeArticleSubject$: BehaviorSubject<IArticle> =
        new BehaviorSubject(null);
    public activeArticlesSubject$: BehaviorSubject<IArticle[]> =
        new BehaviorSubject(null);
    public activeTypeSubject$: BehaviorSubject<IType> = new BehaviorSubject(
        null
    );
    public allTypesSubject$: BehaviorSubject<IType> = new BehaviorSubject(null);
    public blogSubject$: BehaviorSubject<IBlog> = new BehaviorSubject(null);
    public blogTypesSubject$: BehaviorSubject<IType[]> = new BehaviorSubject(
        null
    );
    public breadcrumbSubject$: BehaviorSubject<IBreadcrumbItems> =
        new BehaviorSubject(null);
    public routerParamsSubject$: BehaviorSubject<IRouterParams> =
        new BehaviorSubject(null);
    public isDetailSubject$: BehaviorSubject<boolean> = new BehaviorSubject(
        null
    );
    public totalItemsSubject$: BehaviorSubject<number> = new BehaviorSubject(
        null
    );

    public activeArticle$ = this.activeArticleSubject$.asObservable();
    public activeArticles$ = this.activeArticlesSubject$.asObservable();
    public allTypes$ = this.allTypesSubject$.asObservable();
    public activeType$ = this.activeTypeSubject$.asObservable();
    public blog$ = this.blogSubject$.asObservable();
    public blogTypes$ = this.blogTypesSubject$.asObservable();
    public totalItems$ = this.totalItemsSubject$.asObservable();
    public breadcrumb$ = this.breadcrumbSubject$.asObservable();
    public routerParams$ = this.routerParamsSubject$.asObservable();
    public isDetail$ = this.isDetailSubject$.asObservable();

    constructor(
        private blogService: BlogService,
        private metaService: Meta,
        private titleService: Title
    ) {
        combineLatest([this.routerParams$, this.blog$]).subscribe(
            ([params, blog]) => {
                if (!params?.type || !blog) {
                    return;
                }

                const { types, articles, total } = blog;

                const url = params?.type;
                const isDetail = !!params?.article;
                const allTypes = this.getAllTypes(types);

                this.totalItemsSubject$.next(total);
                this.allTypesSubject$.next(allTypes);
                this.isDetailSubject$.next(isDetail);
                this.setTypes(types);
                this.setActiveType(types, url);
                this.setActiveArticles(articles);
                if (isDetail) {
                    this.setActiveArticle();
                }
                this.setBreadcrumb();
                this.setSeo();
            }
        );
    }

    private getAllTypes = (types: IType[]): IType =>
        R.filter(R.propEq('isAllTypes', true))(types);

    private setActiveType = (types: IType[], url: string): void => {
        const activeType = R.find(R.propEq('url', url))(types);
        this.activeTypeSubject$.next(activeType);
    };

    public getSeoByActiveTag = (type: string, activeTypes: IType[]) =>
        R.pipe(
            R.find(R.propEq('url', type)),
            R.prop('seo'),
            R.head
        )(activeTypes);

    private setActiveArticles = (articles: IArticle[]): void => {
        const { url } = this.activeTypeSubject$.getValue() || {};

        const activeArticles = R.cond([
            [(data) => this.isAllTypes(), (data) => data],
            [
                (data) => !this.isAllTypes(),
                R.filter(R.pipe(R.prop('type'), R.find(R.propEq('url', url)))),
            ],
        ])(articles);

        this.activeArticlesSubject$.next(articles);
    };

    private setTypes = (types: IType[]): void =>
        this.blogTypesSubject$.next(types);

    private setBreadcrumb = (): void => {
        const isDetail = this.isDetailPage();
        if (isDetail) {
            const activeArticle = this.activeArticleSubject$.getValue();
            if (!activeArticle) {
                return;
            }
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
    };

    private setActiveArticle = (): void => {
        const activeArticleParam = this.routerParamsSubject$.getValue().article;
        const activeArticles = this.activeArticlesSubject$.getValue();

        const activeArticle = R.find(R.propEq('url', activeArticleParam))(
            activeArticles
        );
        this.activeArticleSubject$.next(activeArticle);
    };

    private setSeo = (): void => {
        const isDetail = this.isDetailPage();
        const seo = isDetail ? this.getSeoDetail() : this.getSeoOverview();

        if (!seo) {
            return;
        }

        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });
    };

    private getSeoOverview = (): ISeo =>
        R.pipe(R.prop('seo'), R.head)(this.activeTypeSubject$.getValue());

    private getSeoDetail = (): ISeo => {
        const activeArticle = this.activeArticleSubject$.getValue();
        if (!activeArticle) {
            return null;
        }
        return R.pipe(R.prop('seo'), R.head)(activeArticle);
    };

    private isDetailPage = (): boolean => this.isDetailSubject$.getValue();
    private isAllTypes = (): boolean =>
        this.activeTypeSubject$.getValue().url === CONSTS.ALL_BLOG;

    public fetchMoreArticles(page: number): void {
        const currentCountArticle =
            this.activeArticlesSubject$.getValue().length;

        this.blogService
            .getArticles(
                currentCountArticle,
                this.isAllTypes()
                    ? null
                    : this.activeTypeSubject$.getValue().url,
                page.toString()
            )
            .subscribe(({ items }) => {
                const currentArticles = this.activeArticlesSubject$.getValue();
                const nextArticleState = [...currentArticles, ...items];
                this.activeArticlesSubject$.next(nextArticleState);
            });
    }

    public typeChange = (params: IRouterParams) => {
        this.blogService
            .getArticles(
                0,
                params.type !== CONSTS.ALL_BLOG ? params.type : undefined
            )
            .subscribe(({ items, total }) => {
                this.routerParamsSubject$.next(params);
                this.blogSubject$.next({
                    types: this.blogTypesSubject$.value,
                    total: total,
                    articles: items,
                });
            });
    };
}
