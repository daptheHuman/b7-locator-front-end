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

const createReferencedSample = (retainedSample: CreateReferencedSample) =>
  axios
    .post<CreateReferencedSample>('/retained/', retainedSample)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteReferencedSample = (retainedSampleId: string | number) =>
  axios
    .delete<UpdateAndDeleteReferencedSample>(`/retained/${retainedSampleId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateReferencedSample = (updatedRetainedSample: UpdateAndDeleteReferencedSample) =>
  axios
    .put<UpdateAndDeleteReferencedSample>(
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
    .get<ReferencedSample[]>(`/reference/destroy?month=${month}&year=${year}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });
};

export {
  getDestroySamples,
  getReferencedSamples,
  createReferencedSample,
  deleteReferencedSample,
  updateReferencedSample,
};
