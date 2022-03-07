import { gql } from 'apollo-angular';
import { CONSTS } from 'src/app/app.constants';

export const getArticles = gql`
    query queryArticleContentsWithTotal($skip: Int!, $filter: String) {
        queryArticleContentsWithTotal(
            skip: $skip
            top: ${CONSTS.ARTICLE_PAGE_SIZE}
            orderby: "data/date/iv desc"
            filter: $filter
        ) {
            items {
                flatData {
                    content
                    header
                    img {
                        url
                    }
                    type {
                        flatData {
                            url
                        }
                    }
                    seo {
                        flatData {
                            description
                            keywords
                            title
                        }
                    }
                    oneOfMostVisited
                    url
                    date
                }
            }
            total
        }
    }
`;

export const getTypes = gql`
    query queryTypeContents {
        queryTypeContents(orderby: "data/order/iv asc") {
            flatData {
                label
                order
                title
                url
                seo {
                    flatData {
                        description
                        keywords
                        title
                    }
                }
            }
        }
    }
`;
