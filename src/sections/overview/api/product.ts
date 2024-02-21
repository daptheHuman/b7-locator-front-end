import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const getProductCount = () =>
  axios
    .get<number>('/stats/products/count')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

export { getProductCount };
