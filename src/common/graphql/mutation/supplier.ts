import gql from 'graphql-tag';

export const updateSupplierProfileMutation = gql`
    mutation updateSupplierProfile($supplierInput: SupplierInput!){
        updateSupplierProfile(supplierInput: $supplierInput)
    }
`;
