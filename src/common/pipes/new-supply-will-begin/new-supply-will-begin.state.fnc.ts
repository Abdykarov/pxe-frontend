import * as R from 'ramda';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { IFormSupplyPointDefinition } from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.model';

export const isContractEndDefault = (form: IFormSupplyPointDefinition) =>
    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_DEFAULT);

export const isContractEndTerm = (form: IFormSupplyPointDefinition) =>
    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM);

export const isContractEndRequest = (form: IFormSupplyPointDefinition) =>
    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERMINATE);

export const isContractEndTermWithProlongation = (form: IFormSupplyPointDefinition) =>
    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION);

export const isContractEndIndefinitePeriod = (form: IFormSupplyPointDefinition) =>
    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD);

export const isContractEndTermOrRequest = (form: IFormSupplyPointDefinition) =>
    isContractEndTerm(form) || isContractEndRequest(form);
