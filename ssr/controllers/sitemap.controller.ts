// Server static files from /app
import * as R from 'ramda';
import * as xml2js from 'xml2js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { normalize } from '../../src/common/cms/utils';
import {appState} from '../jobs/appState';
import {APP_FOLDER} from '../consts';

const getQuestions = (questions) => {
    if (!R.path(['angularDevstack', 'config', 'includeTestData'], window)) {
        return R.reject(
            R.pipe(
                R.prop('flatData'),
                R.propEq('isTestData')(true),
            ),
        )(questions);
    }
    return questions;
};

const getTypes = (types, allType) => R.pipe(
    R.map(R.prop('type')),
    R.flatten,
    R.uniqBy(R.prop('url')),
    R.insert(0, allType),
    R.sortBy(R.prop('order')),
)(types);

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
                            `${req.protocol}://${req.get('host')}/faq/${(question.flatData.tag[0].flatData.url)}/${question.flatData.url}`,
                        ],
                    });
                }
            });
            faqTypes.forEach(faqType => {
                if (url && url.length) {
                    url.push({
                        'loc': [
                            `${req.protocol}://${req.get('host')}/faq/${(faqType.tag[0].url)}`,
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
                            `${req.protocol}://${req.get('host')}/blog/${(R.pipe(
                                R.prop('type'),
                                R.reject(R.propEq('url', 'all')),
                                R.head,
                                R.prop('url'),
                            )(article))}/${(article.url)}`,
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
