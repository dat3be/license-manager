import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import LicenseManager from './LicenseManager';

jest.mock('axios');

const mockLicenses = [
  {
    id: 1,
    key: 'abc-123',
    product: { name: 'Product 1' },
    customer: { name: 'Customer 1' }
  }
];

describe('LicenseManager', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockLicenses });
  });

  test('renders License Management title', () => {
    render(<LicenseManager />);
    expect(screen.getByText('License Management')).toBeInTheDocument();
  });

  test('fetches and displays licenses', async () => {
    render(<LicenseManager />);
    expect(await screen.findByText('abc-123')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
  });

  test('creates a new license', async () => {
    axios.post.mockResolvedValue({
      data: {
        id: 2,
        key: 'def-456',
        product: { name: 'Product 2' },
        customer: { name: 'Customer 2' }
      }
    });

    render(<LicenseManager />);
    fireEvent.change(screen.getByPlaceholderText('Product ID'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('Create License'));

    expect(await screen.findByText('def-456')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Customer 2')).toBeInTheDocument();
  });
});
