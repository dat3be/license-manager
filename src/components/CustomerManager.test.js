import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import CustomerManager from './CustomerManager';

jest.mock('axios');

const mockCustomers = [
  { id: 1, name: 'Customer 1' }
];

describe('CustomerManager', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCustomers });
  });

  test('renders Customer Management title', async () => {
    render(<CustomerManager />);
    expect(screen.getByText('Customer Management')).toBeInTheDocument();
  });

  test('fetches and displays customers', async () => {
    render(<CustomerManager />);
    expect(await screen.findByText('Customer 1')).toBeInTheDocument();
  });

  test('creates a new customer', async () => {
    axios.post.mockResolvedValue({
      data: { id: 2, name: 'Customer 2' }
    });

    render(<CustomerManager />);
    fireEvent.change(screen.getByPlaceholderText('Customer Name'), { target: { value: 'Customer 2' } });
    fireEvent.click(screen.getByText('Create Customer'));

    expect(await screen.findByText('Customer 2')).toBeInTheDocument();
  });
});
