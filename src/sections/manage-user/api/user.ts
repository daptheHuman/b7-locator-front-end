import { AxiosError } from 'axios';

import axios from 'src/config/axios';

import { UserUpdate } from '../types';

const getAllUsers = (query: string, page: number, pageSize: number) =>
  axios
    .get<User[]>(`/users/?query=${query}&skip=${page * pageSize}&limit=${pageSize}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateUser = (user_id: number, updatedUser: UserUpdate) =>
  axios
    .put<User>(`/users/${user_id}`, updatedUser)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteUser = (user_id: string | number) =>
  axios.delete(`/users/${user_id}`).catch((error: AxiosError) => {
    throw error;
  });

const rowCountUsers = () =>
  axios
    .get<number>('stats/users/count')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

export { deleteUser, updateUser, getAllUsers, rowCountUsers };
