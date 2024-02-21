import { Dayjs } from 'dayjs';
import { AxiosError } from 'axios';

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

export {
  getDestroySamples,
  getRetainedSamples,
  createRetainedSample,
  deleteRetainedSample,
  updateRetainedSample,
};
