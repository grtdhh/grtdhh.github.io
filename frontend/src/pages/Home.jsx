import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import VirtualTour from '../components/VirtualTour';
import CaveInfo from '../components/CaveInfo';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Layout className="layout">
      <Header>
        <Title level={3} style={{ color: 'white', margin: '16px 0' }}>
          敦煌莫高窟虚拟游览
        </Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <VirtualTour />
          </Col>
          <Col xs={24} lg={8}>
            <CaveInfo />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home; 