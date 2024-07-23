// src/hooks/useCustomers.js
import { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../services/api';

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addCustomer = async (customer) => {
    try {
      const response = await createCustomer(customer);
      setCustomers([...customers, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const editCustomer = async (id, updatedCustomer) => {
    try {
      const response = await updateCustomer(id, updatedCustomer);
      setCustomers(customers.map((customer) => (customer.id === id ? response.data : customer)));
    } catch (error) {
      setError(error);
    }
  };

  const removeCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    editCustomer,
    removeCustomer,
    fetchCustomers,
  };
};

export default useCustomers;
