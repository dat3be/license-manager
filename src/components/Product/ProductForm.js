// src/components/Product/ProductForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card } from 'antd';
import useProducts from '../../hooks/useProducts';

const ProductForm = ({ initialData = {}, onSuccess }) => {
  const [product, setProduct] = useState(initialData);
  const { addProduct, editProduct } = useProducts();

  useEffect(() => {
    setProduct(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (product.id) {
        await editProduct(product.id, product);
      } else {
        await addProduct(product);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card title="Product Form" bordered={false} style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
      <Form onFinish={handleSubmit} initialValues={product}>
        <Form.Item name="name" label="Product Name">
          <Input name="name" value={product.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input name="description" value={product.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

ProductForm.propTypes = {
  initialData: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default ProductForm;
