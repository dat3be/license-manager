import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import ProductManager from './ProductManager';

jest.mock('axios');

const mockProducts = [
  { id: 1, name: 'Product 1' }
];

describe('ProductManager', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  test('renders Product Management title', async () => {
    render(<ProductManager />);
    expect(screen.getByText('Product Management')).toBeInTheDocument();
  });

  test('fetches and displays products', async () => {
    render(<ProductManager />);
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
  });

  test('creates a new product', async () => {
    axios.post.mockResolvedValue({
      data: { id: 2, name: 'Product 2' }
    });

    render(<ProductManager />);
    fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: 'Product 2' } });
    fireEvent.click(screen.getByText('Create Product'));

    expect(await screen.findByText('Product 2')).toBeInTheDocument();
  });
});
