import * as R from 'ramda';
import * as xml2js from 'xml2js';
import { join } from 'path';
import { readFileSync } from 'fs';

import { APP_FOLDER } from 'ssr/consts';
import { appState } from 'ssr/jobs/appState';
import {
    getQuestions,
    getTypeOfArticle,
    getTypes,
} from 'ssr/utils/sitemap';
import { normalize } from 'src/common/cms/utils';

const controller = {
    sitemap: (req, res) => {
        const state = appState.getState();
        const siteMapOriginal = readFileSync(join(APP_FOLDER, 'sitemap.xml'), 'utf8');
        const parseString = xml2js.parseString;
        const questions = getQuestions(state.questionsSource.data.queryQuestionContents);
        const blogData = normalize(state.blogSource.data.queryBlogContents)[0];
        const types = getTypes(blogData.articles, blogData.allType[0]);
        const faqTypes = normalize(state.faqTypeSource.data.queryFaqContents);

        parseString(siteMapOriginal, (err, result) => {
            const url = R.path(['urlset', 'url' ], result);
            questions.forEach(question => {
                if (url && url.length) {
                    url.push({
                        'loc': [
                            `${req.protocol}://${req.get('host')}/casto-kladene-otazky/${(question.flatData.tag[0].flatData.url)}/${question.flatData.url}`,
                        ],
                    });
                }
            });
            faqTypes.forEach(faqType => {
                if (url && url.length) {
                    url.push({
                        'loc': [
                            `${req.protocol}://${req.get('host')}/casto-kladene-otazky/${(faqType.tag[0].url)}`,
                        ],
                    });
                }
            });
            types.forEach(type => {
                if (url && url.length) {
                    url.push({
                        'loc': [
                            `${req.protocol}://${req.get('host')}/blog/${(type.url)}`,
                        ],
                    });
                }
            });
            blogData.articles.forEach(article => {
                if (url && url.length) {
                    url.push({
                        'loc': [
                            `${req.protocol}://${req.get('host')}/blog/${getTypeOfArticle(article)}/${(article.url)}`,
                        ],
                    });
                }
            });

            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);
            res.set('Content-Type', 'text/xml');
            return res.send(xml);
        });
    },
};

export default controller;
