// src/components/Customer/CustomerList.js
import React, { useEffect } from 'react';
import { List, Button, Card, message, Spin } from 'antd';
import useCustomers from '../../hooks/useCustomers';

const CustomerList = ({ onEdit }) => {
  const { customers, loading, error, removeCustomer } = useCustomers();

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch customers');
    }
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await removeCustomer(id);
      message.success('Customer deleted successfully');
    } catch (error) {
      message.error('Failed to delete customer');
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title="Customers" bordered={false} style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <List
        dataSource={customers}
        renderItem={(customer) => (
          <List.Item
            actions={[
              <Button onClick={() => onEdit(customer)}>Edit</Button>,
              <Button onClick={() => handleDelete(customer.id)}>Delete</Button>,
            ]}
          >
            {customer.name} - {customer.email}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CustomerList;
