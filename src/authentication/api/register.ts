import { AxiosError } from 'axios';

import axios from 'src/config/axios';

const userRegister = (registerInput: AuthInput) =>
  axios
    .postForm<Token>('/authentication/register', registerInput)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });

export { userRegister };
