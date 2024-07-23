// src/components/Product/ProductList.js
import React, { useEffect } from 'react';
import { List, Button, Card, message, Spin } from 'antd';
import useProducts from '../../hooks/useProducts';

const ProductList = ({ onEdit }) => {
  const { products, loading, error, removeProduct } = useProducts();

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch products');
    }
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await removeProduct(id);
      message.success('Product deleted successfully');
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title="Products" bordered={false} style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <List
        dataSource={products}
        renderItem={(product) => (
          <List.Item
            actions={[
              <Button onClick={() => onEdit(product)}>Edit</Button>,
              <Button onClick={() => handleDelete(product.id)}>Delete</Button>,
            ]}
          >
            {product.name} - {product.description}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProductList;
