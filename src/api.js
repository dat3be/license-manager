import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000';

export const fetchProducts = () => axios.get(`${API_ENDPOINT}/products`);
export const createProduct = (data) => axios.post(`${API_ENDPOINT}/products`, data);
export const updateProduct = (id, data) => axios.patch(`${API_ENDPOINT}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_ENDPOINT}/products/${id}`);

export const fetchCustomers = () => axios.get(`${API_ENDPOINT}/customers`);
export const createCustomer = (data) => axios.post(`${API_ENDPOINT}/customers`, data);
export const updateCustomer = (id, data) => axios.patch(`${API_ENDPOINT}/customers/${id}`, data);
export const deleteCustomer = (id) => axios.delete(`${API_ENDPOINT}/customers/${id}`);
