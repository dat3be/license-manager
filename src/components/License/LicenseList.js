// src/components/License/LicenseList.js
import React, { useEffect } from 'react';
import { List, Button, Card, message, Spin } from 'antd';
import useLicenses from '../../hooks/useLicenses';

const LicenseList = ({ onEdit }) => {
  const { licenses, loading, error, removeLicense } = useLicenses();

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch licenses');
    }
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await removeLicense(id);
      message.success('License deleted successfully');
    } catch (error) {
      message.error('Failed to delete license');
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title="Licenses" bordered={false} style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <List
        dataSource={licenses}
        renderItem={(license) => (
          <List.Item
            actions={[
              <Button onClick={() => onEdit(license)}>Edit</Button>,
              <Button onClick={() => handleDelete(license.id)}>Delete</Button>,
            ]}
          >
            Product ID: {license.productId}, Customer ID: {license.customerId}, Key: {license.key}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LicenseList;
