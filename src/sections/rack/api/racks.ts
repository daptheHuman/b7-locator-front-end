import { AxiosError } from 'axios';

import axios from 'src/config/axios';

import { RackRow } from '../types';

const createRack = (newRack: Rack) =>
  axios
    .post<Rack>('/rack/', newRack)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const getRacks = () =>
  axios
    .get<Rack[]>('/rack/?skip=0')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateRack = (rack: RackRow) =>
  axios
    .put<Rack>(`/rack/${rack.id}`, { ...rack })
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteRack = (rackId: string | number) =>
  axios
    .delete<Rack>(`/rack/${rackId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

export { getRacks, createRack, updateRack, deleteRack };
