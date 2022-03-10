import * as mCache from 'memory-cache';
import * as request from 'request';
import {
    bodyBlogQuery,
    bodyFaqType,
    bodyQuestionsQuery,
    newTokenRequest,
    queryRequest,
} from 'src/server/shared/requests/squidex';
import { getAuthorizationFromPayload } from 'src/server/shared/utils/squidex';

const initState = () => {
    let Authorization = null;
    let questionsSource = null;
    let blogSource = null;
    let faqTypeSource = null;

    const setQuestions = () =>
        request(
            queryRequest(bodyQuestionsQuery, Authorization),
            (_, __, body) => {
                questionsSource = JSON.parse(body);
            }
        );

    const setBlog = () =>
        request(queryRequest(bodyBlogQuery, Authorization), (_, __, body) => {
            blogSource = JSON.parse(body);
        });

    const setFaq = () =>
        request(queryRequest(bodyFaqType, Authorization), (_, __, body) => {
            faqTypeSource = JSON.parse(body);
        });

    const resetAppState = () => {
        request(newTokenRequest, (_, __, body) => {
            const payload = JSON.parse(body);
            Authorization = getAuthorizationFromPayload(payload);
            setQuestions();
            setBlog();
            setFaq();
        });
        mCache.clear();
    };

    const getState = () => ({
        Authorization,
        questionsSource,
        blogSource,
        faqTypeSource,
    });

    return {
        getState,
        resetAppState,
    };
};

export const appState = initState();
