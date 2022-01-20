import * as fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as R from 'ramda';
import { normalize } from 'src/common/cms/utils';
import 'src/server/generate-data-for-prerender/init';
import { result } from 'src/server/generate-data-for-prerender/state/appState';
import { generateBuildId } from 'src/server/generate-data-for-prerender/utils/generate-build-id';
import { generateRoutes } from 'src/server/generate-data-for-prerender/utils/generate-routes';
import { getConfig } from 'src/server/shared/config/config';
import { DIST_FOLDER } from 'src/server/shared/consts';
import {
    getQuestions,
    getTypeOfArticle,
    getTypes,
} from 'src/server/shared/utils/sitemap';
import * as xml2js from 'xml2js';

result.then((state: any) => {
    const config = getConfig();
    const siteMapOriginal = readFileSync(
        join(DIST_FOLDER, 'data', 'sitemap.xml'),
        'utf8'
    );
    const parseString = xml2js.parseString;
    const questions = getQuestions(state[0].data.queryQuestionContents);
    const blogData = normalize(state[1].data.queryBlogContents)[0];
    const types = getTypes(blogData.articles, blogData.allType[0]);
    const faqTypes = normalize(state[2].data.queryFaqContents);

    parseString(siteMapOriginal, (err, result) => {
        const url = R.path(['urlset', 'url'], result);
        questions.forEach((question) => {
            if (url && url.length) {
                url.push({
                    loc: [
                        `${config['url']}/casto-kladene-otazky/${question.flatData.tag[0].flatData.url}/${question.flatData.url}`,
                    ],
                });
            }
        });
        faqTypes.forEach((faqType) => {
            if (url && url.length) {
                url.push({
                    loc: [
                        `${config['url']}/casto-kladene-otazky/${faqType.tag[0].url}`,
                    ],
                });
            }
        });
        types.forEach((type) => {
            if (url && url.length) {
                url.push({
                    loc: [`${config['url']}/blog/${type.url}`],
                });
            }
        });
        blogData.articles.forEach((article) => {
            if (url && url.length) {
                url.push({
                    loc: [
                        `${config['url']}/blog/${getTypeOfArticle(article)}/${
                            article.url
                        }`,
                    ],
                });
            }
        });

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        fs.writeFile('./src/sitemap.xml', xml, { flag: 'w' }, (err) => {
            if (err) console.error(err);
        });
        generateRoutes(xml);
        generateBuildId();
    });
});
