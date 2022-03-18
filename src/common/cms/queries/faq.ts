import { gql } from 'apollo-angular';
import { seoFragment } from './seo';

export const questionsFragment = gql`
    fragment questionsFragment on Question {
        flatData {
            id
            fullContent
            shortContent
            isTestData
            oneOfMostVisited
            seoKeywords
            tag {
                flatData {
                    label
                    type
                    url
                    title
                }
            }
            header
            url
            vatNumber
        }
    }
`;

export const questionsSection = `queryQuestionContents(orderby: "data/header/iv", top: 100) {
    ...questionsFragment
}`;

export const questionsQuery = gql`
    query queryQuestionContents {
        ${questionsSection}
    }
    ${questionsFragment}
`;

export const faqFragment = gql`
    fragment faqFragment on Tag {
        flatData {
            type
            url
            label
            title
            order
        }
    }
`;

export const faqSection = `queryTagContents(orderby: "data/order/iv asc") {
    ...faqFragment
}`;

export const faqConfigQuery = gql`
    query queryTagContents {
        ${faqSection}
    }
    ${faqFragment}
`;

export const faqQuery = gql`
    query queryFaqContents {
        queryFaqContents {
            flatData {
                title
                breadcrumbTitle
                tag {
                    flatData {
                        type
                        url
                        label
                        title
                        order
                    }
                }
                seo {
                    ...seoFragment
                }
            }
        }
    }
    ${seoFragment}
`;
