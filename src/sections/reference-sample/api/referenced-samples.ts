import { Dayjs } from 'dayjs';
import { AxiosError } from 'axios';

import axios from '../../../config/axios';
import { CreateReferencedSample, UpdateAndDeleteReferencedSample } from '../types';

const getReferencedSamples = () =>
  axios
    .get<ReferencedSample[]>('/reference/?skip=0&limit=100')
    .then((response) =>
      response.data.map((_sample) => ({
        ..._sample,
        manufacturing_date: new Date(_sample.manufacturing_date),
        expiration_date: new Date(_sample.expiration_date),
        destroy_date: new Date(_sample.destroy_date),
      }))
    )
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const createReferencedSample = (referncedSample: CreateReferencedSample) =>
  axios
    .post<CreateReferencedSample>('/reference/', referncedSample)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteReferencedSample = (referencedSampleId: string | number) =>
  axios
    .delete<UpdateAndDeleteReferencedSample>(`/reference/${referencedSampleId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateReferencedSample = (updatedReferencedSample: UpdateAndDeleteReferencedSample) =>
  axios
    .put<UpdateAndDeleteReferencedSample>(
      `/reference/${updatedReferencedSample.id}`,
      updatedReferencedSample
    )
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const getDestroySamples = (date: Dayjs) => {
  const month = date.month() + 1;
  const year = date.year();
  return axios
    .get<ReferencedSample[]>(`/reference/destroy?month=${month}&year=${year}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

const createDestroyReport = (date: Dayjs) => {
  const month = date.month() + 1;
  const year = date.year();
  axios
    .get(`/reference/generate-destroy-report?month=${month}&year=${year}`, {
      responseType: 'blob',
    })
    .then((blob) => {
      const href = URL.createObjectURL(blob.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      const filename = blob.headers['content-disposition'].split('filename=')[1];

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export {
  getDestroySamples,
  createDestroyReport,
  getReferencedSamples,
  createReferencedSample,
  deleteReferencedSample,
  updateReferencedSample,
};
