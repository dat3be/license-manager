import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, notification, Typography } from 'antd';

const { Title } = Typography;

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function LicenseManager() {
  const [licenses, setLicenses] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLicenses();
  }, []);

  const fetchLicenses = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/licenses`);
      setLicenses(response.data);
    } catch (error) {
      console.error('Error fetching licenses:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/licenses`, values);
      setLicenses([...licenses, response.data]);
      form.resetFields();
      notification.success({
        message: 'License Created',
        description: 'The license has been successfully created.',
      });
    } catch (error) {
      console.error('Error creating license:', error);
      notification.error({
        message: 'Creation Error',
        description: 'There was an error creating the license.',
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Key', dataIndex: 'key', key: 'key' },
    { title: 'Product', dataIndex: ['product', 'name'], key: 'product' },
    { title: 'Customer', dataIndex: ['customer', 'name'], key: 'customer' },
  ];

  return (
    <div>
      <Title className="page-title">License Management</Title>
      <Form form={form} layout="inline" onFinish={onFinish} className="form-container">
        <Form.Item
          name="productId"
          rules={[{ required: true, message: 'Please input the product ID!' }]}
          className="form-item"
        >
          <Input placeholder="Product ID" />
        </Form.Item>
        <Form.Item
          name="customerId"
          rules={[{ required: true, message: 'Please input the customer ID!' }]}
          className="form-item"
        >
          <Input placeholder="Customer ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create License
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={licenses}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}

export default LicenseManager;
