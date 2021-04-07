// import * as request from 'request';
// import * as mCache from 'memory-cache';
// import * as cron from 'cron';
// const CronJob = cron.CronJob;
//
// import {bodyBlogQuery, bodyFaqType, bodyQuestionsQuery} from '../consts';
// import {getAuthorizationFromPayload} from '../utils';
// import {newTokenRequest, queryRequest} from '../requests/squidex';
//
// export let Authorization = null;
// export let questionsSource = null;
// export let blogSource = null;
// export let faqTypeSource = null;
//
// const setQuestions = () => request(queryRequest({bodyQuestionsQuery}, Authorization), (_, __, body) => {
//     questionsSource = JSON.parse(body);
// });
//
// const setBlog = () => request(queryRequest(bodyBlogQuery, Authorization), (_, __, body) => {
//     blogSource = JSON.parse(body);
// });
//
// const setFaq = () => request(queryRequest(bodyFaqType, Authorization), (_, __, body) => {
//     faqTypeSource = JSON.parse(body);
// });
//
// const resetAppState = () => {
//     request(newTokenRequest, (_, __, body) => {
//         const payload = JSON.parse(body);
//         Authorization = getAuthorizationFromPayload(payload);
//         setQuestions();
//         setBlog();
//         setFaq();
//     });
//
//     mCache.clear();
// };
//
// const job = new CronJob(
//     '0 22 * * *',
//     resetAppState,
//     null,
//     true,
//     'Europe/Prague',
// );
// job.start();
// resetAppState();
