import * as request from 'request';
import {
    bodyBlogQuery,
    bodyFaqType,
    bodyQuestionsQuery,
    newTokenRequest,
    queryRequest,
} from '../requests/squidex';
import { getAuthorizationFromPayload } from '../utils/squidex';

const requestToPromise = (
    requestBody,
    mapping = (data) => data
): Promise<string> => {
    return new Promise(function (resolve, reject) {
        request(requestBody, (error, response, body) => {
            if (error) return reject(error);
            try {
                resolve(mapping(JSON.parse(body)));
            } catch (e) {
                reject(e);
            }
        });
    });
};

const tokenRequest: Promise<string> = requestToPromise(
    newTokenRequest,
    (data) => getAuthorizationFromPayload(data)
);

export const result = tokenRequest.then((Authorization: string) => {
    const questionRequest: Promise<string> = requestToPromise(
        queryRequest(bodyQuestionsQuery, Authorization)
    );
    const blogRequest: Promise<string> = requestToPromise(
        queryRequest(bodyBlogQuery, Authorization)
    );
    const faqRequest: Promise<string> = requestToPromise(
        queryRequest(bodyFaqType, Authorization)
    );

    return Promise.all([questionRequest, blogRequest, faqRequest]);
});
