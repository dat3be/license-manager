// src/components/Product/AddProductPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Navigate to the product list page after successful submission
    navigate('/products/all');
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm initialData={{}} onSuccess={handleSuccess} />
    </div>
  );
};

export default AddProductPage;
