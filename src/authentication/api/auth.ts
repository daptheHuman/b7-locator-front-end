import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const getUser = () =>
  axios
    .get<User>('/authentication/profile')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });

export { getUser };
