import axios from 'src/config/axios';

const getAllRacksId = () =>
  axios
    .get<Rack[]>('/rack/?skip=0')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export { getAllRacksId };
