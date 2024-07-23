// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await createProduct(product);
      setProducts([...products, response.data]);
    } catch (error) {
      setError(error);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await updateProduct(id, updatedProduct);
      setProducts(products.map((product) => (product.id === id ? response.data : product)));
    } catch (error) {
      setError(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    fetchProducts,
  };
};

export default useProducts;
