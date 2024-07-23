import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, notification, Popconfirm, Typography } from 'antd';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api';

const { Title } = Typography;

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
        notification.success({ message: 'Product Updated', description: 'Product has been successfully updated.' });
      } else {
        await createProduct(values);
        notification.success({ message: 'Product Created', description: 'Product has been successfully created.' });
      }
      form.resetFields();
      setEditingProduct(null);
      fetchAllProducts();
    } catch (error) {
      console.error('Error creating/updating product:', error);
      notification.error({ message: 'Error', description: 'There was an error creating/updating the product.' });
    }
  };

  const onEdit = (product) => {
    form.setFieldsValue(product);
    setEditingProduct(product);
  };

  const onDelete = async (id) => {
    try {
      await deleteProduct(id);
      notification.success({ message: 'Product Deleted', description: 'Product has been successfully deleted.' });
      fetchAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      notification.error({ message: 'Error', description: 'There was an error deleting the product.' });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Title className="page-title">Product Management</Title>
      <Form form={form} layout="inline" onFinish={onFinish} className="form-container">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
          className="form-item"
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}

export default ProductManager;
