import gql from 'graphql-tag';

export const getUserDetail = gql`
    query {
        user @client{
            userPayload{
                data,
                email,
                exp,
                firstname,
                lastSmsConfirmTs,
                manageOffers,
                manageOrders,
                manageUsers,
                role,
                sid,
                smsConfirmed,
                subjectId,
                subjectName,
                surname,
                token,
                username,
            }
        }
    }
`;

export const getEmail = gql`
    query {
        user @client{
            userPayload{
                email,
            }
        }
    }
`;

export const getRole = gql`
    query {
        user @client{
            userPayload{
                role,
            }
        }
    }
`;
