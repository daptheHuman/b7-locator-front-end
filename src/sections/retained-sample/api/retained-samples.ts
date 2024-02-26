import { Dayjs } from 'dayjs';
import { AxiosError } from 'axios';

import { DestroyPackageAndWeight } from 'src/components/destroy/types';

import axios from '../../../config/axios';
import { CreateRetainedSample, UpdateAndDeleteRetainedSample } from '../types';

const getRetainedSamples = () =>
  axios
    .get<RetainedSample[]>('/retained/?skip=0&limit=100')
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

const createRetainedSample = (retainedSample: CreateRetainedSample) =>
  axios
    .post<CreateRetainedSample>('/retained/', retainedSample)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteRetainedSample = (retainedSampleId: string | number) =>
  axios
    .delete<UpdateAndDeleteRetainedSample>(`/retained/${retainedSampleId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateRetainedSample = (updatedRetainedSample: UpdateAndDeleteRetainedSample) =>
  axios
    .put<UpdateAndDeleteRetainedSample>(
      `/retained/${updatedRetainedSample.id}`,
      updatedRetainedSample
    )
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const getDestroySamples = (date: Dayjs) => {
  const month = date.month() + 1;
  const year = date.year();
  return axios
    .get<ReferencedSample[]>(`/retained/destroy?month=${month}&year=${year}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

const createDestroyReport = (date: Dayjs, packageWeight: DestroyPackageAndWeight[]) => {
  const month = date.month() + 1;
  const year = date.year();
  axios
    .post(`/retained/generate-destroy-report?month=${month}&year=${year}`, packageWeight, {
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
  getRetainedSamples,
  createDestroyReport,
  createRetainedSample,
  deleteRetainedSample,
  updateRetainedSample,
};
