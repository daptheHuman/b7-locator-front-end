import { AxiosError } from 'axios';

import axios from '../../../config/axios';

const createProduct = (newProduct: Product) =>
  axios
    .post<Product>('/products/', newProduct)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const getProducts = () =>
  axios
    .get<Product[]>('/products/?skip=0&limit=100')
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const updateProduct = (updatedProduct: Product) =>
  axios
    .put<Product>(`/products/${updatedProduct.product_code}`, updatedProduct)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data;
    });

const deleteProduct = (productId: string | number) =>
  axios
    .delete<Product>(`/products/${productId}`)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error;
    });
export { getProducts, createProduct, updateProduct, deleteProduct };
