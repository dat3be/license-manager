// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getCustomers = () => axios.get(`${API_BASE_URL}/customers`);
export const createCustomer = (customer) => axios.post(`${API_BASE_URL}/customers`, customer);
export const updateCustomer = (id, customer) => axios.put(`${API_BASE_URL}/customers/${id}`, customer);
export const deleteCustomer = (id) => axios.delete(`${API_BASE_URL}/customers/${id}`);

export const getLicenses = () => axios.get(`${API_BASE_URL}/licenses`);
export const createLicense = (license) => axios.post(`${API_BASE_URL}/licenses`, license);
export const updateLicense = (id, license) => axios.put(`${API_BASE_URL}/licenses/${id}`, license);
export const deleteLicense = (id) => axios.delete(`${API_BASE_URL}/licenses/${id}`);

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const createProduct = (product) => axios.post(`${API_BASE_URL}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);
