import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const getAllAudit = (query: string, page: number, pageSize: number) =>
  axios
    .get<Audit[]>(`/audit/?query=${query}&skip=${page * pageSize}&limit=${pageSize}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const clearAudit = () =>
  axios.delete(`/audit`).catch((error: AxiosError) => {
    throw error;
  });

const rowCountAudit = () =>
  axios
    .get<number>('stats/audit/count')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

export { clearAudit, getAllAudit, rowCountAudit };
