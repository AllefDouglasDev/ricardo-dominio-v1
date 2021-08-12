import api from '../api';
import Definitions from '../../core/types';
import { send } from '../request';

export function generate(form: Definitions['CartaResponsabilidade']) {
  return send('chooseDirectory:report', { data: form, cancelTimeout: false });
  // return api.post<Definitions['CartaResponsabilidade']>('/reports', form);
}

export function getCompany(id: string) {
  return api.get<Definitions['CompanyResponsabilityLatter']>(
    `/reports/company/${id}`
  );
}
