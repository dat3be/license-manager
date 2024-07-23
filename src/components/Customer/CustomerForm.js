// src/components/Customer/CustomerForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card } from 'antd';
import useCustomers from '../../hooks/useCustomers';

const CustomerForm = ({ initialData = {}, onSuccess }) => {
  const [customer, setCustomer] = useState(initialData);
  const { addCustomer, editCustomer } = useCustomers();

  useEffect(() => {
    setCustomer(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (customer.id) {
        await editCustomer(customer.id, customer);
      } else {
        await addCustomer(customer);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card title="Customer Form" bordered={false} style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
      <Form onFinish={handleSubmit} initialValues={customer}>
        <Form.Item name="name" label="Name">
          <Input name="name" value={customer.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input name="email" value={customer.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

CustomerForm.propTypes = {
  initialData: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default CustomerForm;
