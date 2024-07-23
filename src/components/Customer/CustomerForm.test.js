// src/components/Customer/CustomerForm.test.js
import { render, fireEvent } from '@testing-library/react';
import CustomerForm from './CustomerForm';

test('submits form with customer data', () => {
  const handleSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<CustomerForm onSubmit={handleSubmit} />);

  fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
  fireEvent.click(getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com' });
});
