import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const getRackCount = () =>
  axios
    .get<number>('/stats/racks/count')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

export { getRackCount };
