import axios, { AxiosError } from 'axios';

const getAllAudit = (query: string | undefined, page: number, pageSize: number) =>
  axios
    .get<Audit[]>(`/audit/?query=${query}&skip=${page * pageSize}&limit=${pageSize}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const clearAudit = () =>
  axios.delete(`/audit/`).catch((error: AxiosError) => {
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
