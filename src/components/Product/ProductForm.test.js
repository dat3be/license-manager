// src/components/Product/ProductForm.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductForm from './ProductForm';

test('submits form with product data', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<ProductForm onSubmit={handleSubmit} />);

  fireEvent.change(getByLabelText('Product Name'), { target: { value: 'Product 1' } });
  fireEvent.change(getByLabelText('Description'), { target: { value: 'Description 1' } });
  fireEvent.click(getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalledWith({ name: 'Product 1', description: 'Description 1' });
});
