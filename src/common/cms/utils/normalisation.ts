import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { CONSTS } from 'src/app/app.constants';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { compareDates } from 'src/common/utils';
import { ILandingPageQuery } from '../models/landing-page';

export const normalizeNews = R.pipe(
    R.head,
    R.prop('news'),
    R.sort((first, second) => compareDates(first.date, second.date, false))
);

const processHeadOperationOnReference = R.mapObjIndexed(
    R.cond([
        [
            (value, key) =>
                R.pipe(R_.isArray, R.and(key !== 'carouselReferences'))(value),
            R.head,
        ],
        [R.T, (data) => data],
    ])
);

const normalizeLogos = (data) => {
    return R.pipe(
        R.path(['aboutUs', 'logos']),
        R.map(({ alt, logo, title, width, faq }) => {
            const faqItem = R.head(faq);
            const { url: logoUrl } = R.head(logo);

            return {
                alt,
                logoUrl,
                title,
                faqUrl: `/${CONSTS.PATHS.FAQ}/${R.head(faqItem.tag).url}/${
                    faqItem.url
                }`,
                width,
            };
        }),
        (normalizedData) =>
            R.assocPath(['aboutUs', 'logos'], normalizedData, data)
    )(data);
};

const normalizeLandingPageContent = R.pipe(
    R.head,
    processHeadOperationOnReference,
    normalizeLogos
);

export const normalizeLandingPageQuery =
    (blogService: BlogService) =>
    ({
        queryArticleContents,
        queryAskForOfferContents,
        queryLandingPageContents,
        querySignUpContents,
    }: ILandingPageQuery): ILandingPageQuery => ({
        queryArticleContents: R.pipe(
            R.map(blogService.articleToCardData),
            R.map(blogService.toShortContent)
        )(queryArticleContents),
        queryAskForOfferContents: R.head(queryAskForOfferContents),
        queryLandingPageContents: normalizeLandingPageContent(
            queryLandingPageContents
        ),
        querySignUpContents: querySignUpContents,
    });
