import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import LicenseManager from './components/LicenseManager';
import ProductManager from './components/ProductManager';
import CustomerManager from './components/CustomerManager';
import './styles.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<KeyOutlined />}>
              <Link to="/licenses">Licenses</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<AppstoreOutlined />}>
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/customers">Customers</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content>
            <div className="site-layout-background">
              <Routes>
                <Route path="/licenses" element={<LicenseManager />} />
                <Route path="/products" element={<ProductManager />} />
                <Route path="/customers" element={<CustomerManager />} />
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
