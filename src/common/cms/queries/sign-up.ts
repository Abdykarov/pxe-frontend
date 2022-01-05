import { gql } from 'apollo-angular';
import { seoFragment } from './seo';

export const signUpFragment = gql`
    fragment signUpFragment on SignUp {
        flatData {
            title
            leftContent
            bubbleText
            seo {
                ...seoFragment
            }
        }
    }
`;

export const signUpSection = `querySignUpContents {
    ...signUpFragment
}`;

export const signUpQuery = gql`
    query querySignUpContents {
        ${signUpSection}
    }
    ${signUpFragment}${seoFragment}
`;
