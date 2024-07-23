// src/components/License/LicenseForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card } from 'antd';
import useLicenses from '../../hooks/useLicenses';

const LicenseForm = ({ initialData = {}, onSuccess }) => {
  const [license, setLicense] = useState(initialData);
  const { addLicense, editLicense } = useLicenses();

  useEffect(() => {
    setLicense(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLicense({ ...license, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (license.id) {
        await editLicense(license.id, license);
      } else {
        await addLicense(license);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card title="License Form" bordered={false} style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
      <Form onFinish={handleSubmit} initialValues={license}>
        <Form.Item name="productId" label="Product ID">
          <Input name="productId" value={license.productId} onChange={handleChange} />
        </Form.Item>
        <Form.Item name="customerId" label="Customer ID">
          <Input name="customerId" value={license.customerId} onChange={handleChange} />
        </Form.Item>
        <Form.Item name="key" label="License Key">
          <Input name="key" value={license.key} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

LicenseForm.propTypes = {
  initialData: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default LicenseForm;
