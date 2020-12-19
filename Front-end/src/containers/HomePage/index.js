import { Col, Row } from 'antd';
import React from 'react';
import Banner from './Banner';
import Filter from './Filter';

function HomePage() {
  return (
    <Row className="container">
      {/* Banners & filter */}
      <Col className="p-tb-32" span={24}>
        <Row>
          {/* Banners */}
          <Col span={24} md={16}>
            <Banner />
          </Col>
          {/* Filters */}
          <Col className="p-l-16" span={24} md={8}>
            <Filter />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HomePage;
