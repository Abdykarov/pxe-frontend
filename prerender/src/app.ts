import * as fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import * as xml2js from 'xml2js';
import { DIST_FOLDER } from './consts';
import './init';
import { result } from './jobs/appState';
import { getQuestions, getTypeOfArticle, getTypes } from './utils/sitemap';
export const isObject = (item: any): boolean => typeof item === 'object';

const flatData = R.prop('flatData');

const isFlatDataArray = R.allPass([Array.isArray, R.all(flatData)]);

const normalize = R.cond([
    [(data) => !data, (data) => data],
    [
        (data) => !!data['img'] && R_.isArray(data['img']),
        (data) =>
            normalize({
                ...data,
                img: data.img[0].url,
            }),
    ],
    [
        isFlatDataArray,
        R.pipe(
            R.map(flatData),
            R.map(
                R.cond([
                    [Array.isArray, (data) => R.map(normalize)(data)],
                    [R.T, (data) => normalize(data)],
                ])
            )
        ),
    ],
    [isObject, (data) => R.map(normalize)(data)],
    [R.T, (data) => data],
]);

result.then((state: any) => {
    const siteMapOriginal = readFileSync(
        join(DIST_FOLDER, 'assets', 'sitemap.xml'),
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
                        `http://localhost:4200/casto-kladene-otazky/${question.flatData.tag[0].flatData.url}/${question.flatData.url}`,
                    ],
                });
            }
        });
        faqTypes.forEach((faqType) => {
            if (url && url.length) {
                url.push({
                    loc: [
                        `http://localhost:4200/casto-kladene-otazky/${faqType.tag[0].url}`,
                    ],
                });
            }
        });
        types.forEach((type) => {
            if (url && url.length) {
                url.push({
                    loc: [`http://localhost:4200/blog/${type.url}`],
                });
            }
        });
        blogData.articles.forEach((article) => {
            if (url && url.length) {
                url.push({
                    loc: [
                        `http://localhost:4200/blog/${getTypeOfArticle(
                            article
                        )}/${article.url}`,
                    ],
                });
            }
        });

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        fs.writeFile('./dist/sitemap.xml', xml, { flag: 'w' }, (err) => {
            if (err) console.error(err);
        });
        const regex = new RegExp('<loc>http://localhost:4200/(.*?)</loc>', 'g');
        let z = [];
        const fileContent = [];
        while (null != z) {
            z = regex.exec(xml);
            if (z !== null) {
                fileContent.push(z[1]); // ouput: "a"
            }
        }
        var file = fs.createWriteStream('dist/routes.txt');
        file.on('error', function (err) {
            /* error handling */
        });
        file.write('/' + '\n');
        fileContent.forEach(function (v) {
            file.write('/' + v + '\n');
        });
        file.end();
    });
});
