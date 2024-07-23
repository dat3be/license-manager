// src/hooks/useLicenses.js
import { useState, useEffect } from 'react';
import { getLicenses, createLicense, updateLicense, deleteLicense } from '../services/api';

const useLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const response = await getLicenses();
      setLicenses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addLicense = async (license) => {
    try {
      const response = await createLicense(license);
      setLicenses([...licenses, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const editLicense = async (id, updatedLicense) => {
    try {
      const response = await updateLicense(id, updatedLicense);
      setLicenses(licenses.map((license) => (license.id === id ? response.data : license)));
    } catch (error) {
      setError(error);
    }
  };

  const removeLicense = async (id) => {
    try {
      await deleteLicense(id);
      setLicenses(licenses.filter((license) => license.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return {
    licenses,
    loading,
    error,
    addLicense,
    editLicense,
    removeLicense,
    fetchLicenses,
  };
};

export default useLicenses;
