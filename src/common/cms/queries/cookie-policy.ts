import { gql } from 'apollo-angular';
import { seoFragment } from './seo';

export const cookiePolicyQuery = gql`
    query queryCookiePolicyContents {
        queryCookiePolicyContents {
            flatData {
                title
                breadcrumbTitle
                htmlContent
                seo {
                    ...seoFragment
                }
            }
        }
    }
    ${seoFragment}
`;
