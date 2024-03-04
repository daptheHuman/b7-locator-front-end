import axios from 'src/config/axios';

const getAllProducts = () =>
  axios
    .get<Product[]>('/products/?skip=0&limit=100')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
export { getAllProducts };
