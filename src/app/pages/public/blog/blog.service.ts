import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';
import { IArticle } from 'src/common/cms/models/blog';
import { HtmlContentPipe } from 'src/common/pipes/common/html-content/html-content.pipe';
import { ICardData } from 'src/common/ui/card/models/data.model';
import { removeHtmlFromText } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    constructor(
        @Inject(LOCALE_ID) private locale: string,
        private htmlContentPipe: HtmlContentPipe
    ) {}

    public articleToCardData = (article: IArticle): ICardData => ({
        id: article.url,
        content: article.shortContent || article.content,
        img: article.img,
        imgAlt: article.header,
        imgTitle: article.header,
        title: article.header,
        textPrefix: formatDate(article.date, 'dd. MM. yyyy', this.locale),
        customData: article?.type && article?.type[0].url,
    });

    public toShortContent = (cardData: ICardData) => {
        const textWithoutHTML = removeHtmlFromText(
            this.htmlContentPipe.transformWithoutTrustHtml(cardData.content)
        );
        const indexOfLastWord = textWithoutHTML
            .substr(CONSTS.MAX_LENGTH_BLOG_DESCRIPTION)
            .indexOf(' ');
        const cutContent = R.pipe(
            R.take(indexOfLastWord + CONSTS.MAX_LENGTH_BLOG_DESCRIPTION),
            (text) => `${text}${CONSTS.APPEND_AFTER_CUT_TEXT}`
        )(textWithoutHTML);
        return {
            ...cardData,
            content: cutContent,
        };
    };

    public getOtherArticles =
        (activeArticle: IArticle): any =>
        (articles: IArticle[]): IArticle[] =>
            R.pipe(
                R.filter(
                    (article: IArticle) => article?.url !== activeArticle?.url
                ),
                R.take(3)
            )(articles);
}
