import axios from '../../../config/axios';

const getAllRacksId = () =>
  axios
    .get<Rack[]>('/rack/?skip=0&limit=100')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export { getAllRacksId };
