import { Injectable } from '@angular/core';

import * as R from 'ramda';

import { CONSTS } from 'src/app/app.constants';
import { ICardData } from 'src/common/ui/card/models/data.model';
import {IArticle, IBlog} from 'src/common/cms/models/blog';
import { removeHtmlFromText } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    public articleToCardData = (article: IArticle): ICardData => ({
        id: article.url,
        content: article.content,
        img: article.img,
        imgAlt: article.img,
        imgTitle: article.img,
        title: article.header,
    })

    public toShortContent = (cardData: ICardData) => {
        const textWithoutHTML = removeHtmlFromText(cardData.content);
        const indexOfLastWord = textWithoutHTML.substr(CONSTS.MAX_LENGTH_SUPPLIER_DESCRIPTION).indexOf(' ');
        const cutContent =  R.pipe(
            R.take(indexOfLastWord + CONSTS.MAX_LENGTH_SUPPLIER_DESCRIPTION),
            (text) => `${text}${CONSTS.APPEND_AFTER_CUT_TEXT}`,
        )(textWithoutHTML);
        return {
            ...cardData,
            content: cutContent,
        };
    }

    public getOtherArticles = (activeArticle: IArticle): any => (articles: IArticle[]): IArticle[] => R.pipe(
         R.filter((article: IArticle) => article?.url !== activeArticle?.url),
         R.take(3),
     )(articles)
}
