// src/components/License/LicenseForm.test.js
import { render, fireEvent } from '@testing-library/react';
import LicenseForm from './LicenseForm';

test('submits form with license data', () => {
  const handleSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LicenseForm onSubmit={handleSubmit} />);

  fireEvent.change(getByPlaceholderText('Product ID'), { target: { value: '1' } });
  fireEvent.change(getByPlaceholderText('Customer ID'), { target: { value: '1' } });
  fireEvent.change(getByPlaceholderText('License Key'), { target: { value: 'ABC-123' } });
  fireEvent.click(getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalledWith({ productId: '1', customerId: '1', key: 'ABC-123' });
});
