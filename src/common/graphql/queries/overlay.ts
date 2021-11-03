import {gql} from 'apollo-angular';


export const showOverlayQuery = gql`
    query {
        ui @client{
            showOverlay
        }
    }
`;
