import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const userLogin = (loginInput: AuthInput) =>
  axios
    .postForm<Token>('/authentication/login', loginInput)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });

export { userLogin };
