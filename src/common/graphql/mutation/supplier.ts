import {gql} from 'apollo-angular';


export const updateSupplierProfileMutation = gql`
    mutation updateSupplierProfile($supplierInput: SupplierInput!){
        updateSupplierProfile(supplierInput: $supplierInput)
    }
`;
