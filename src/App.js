// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, UserOutlined, KeyOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import LicenseForm from './components/License/LicenseForm';
import CustomerForm from './components/Customer/CustomerForm'; // Ensure this path is correct
import ProductForm from './components/Product/ProductForm';
import ProductList from './components/Product/ProductList';
import './styles.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<KeyOutlined />}>
              <Link to="/licenses">Licenses</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Products">
              <Menu.Item key="2" icon={<PlusOutlined />}>
                <Link to="/products/new">Add New Product</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                <Link to="/products/all">All Products</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
            License Manager
          </Header>
          <Content style={{ margin: '0 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="site-layout-background" style={{ padding: 24, width: '100%', maxWidth: '800px', marginTop: '20px' }}>
              <Routes>
                <Route path="/licenses" element={<LicenseForm />} />
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/all" element={<ProductList />} />
                <Route path="/customers" element={<CustomerForm />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>License Manager ©2024</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
