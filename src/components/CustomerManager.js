import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, notification, Popconfirm, Typography } from 'antd';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api';

const { Title } = Typography;

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await fetchCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, values);
        notification.success({ message: 'Customer Updated', description: 'Customer has been successfully updated.' });
      } else {
        await createCustomer(values);
        notification.success({ message: 'Customer Created', description: 'Customer has been successfully created.' });
      }
      form.resetFields();
      setEditingCustomer(null);
      fetchAllCustomers();
    } catch (error) {
      console.error('Error creating/updating customer:', error);
      notification.error({ message: 'Error', description: 'There was an error creating/updating the customer.' });
    }
  };

  const onEdit = (customer) => {
    form.setFieldsValue(customer);
    setEditingCustomer(customer);
  };

  const onDelete = async (id) => {
    try {
      await deleteCustomer(id);
      notification.success({ message: 'Customer Deleted', description: 'Customer has been successfully deleted.' });
      fetchAllCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      notification.error({ message: 'Error', description: 'There was an error deleting the customer.' });
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
      <Title className="page-title">Customer Management</Title>
      <Form form={form} layout="inline" onFinish={onFinish} className="form-container">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the customer name!' }]}
          className="form-item"
        >
          <Input placeholder="Customer Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCustomer ? 'Update Customer' : 'Create Customer'}
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={customers}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}

export default CustomerManager;
