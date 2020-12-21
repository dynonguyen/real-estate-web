import { Col, Row } from 'antd';
import HouseList from 'containers/HouseList';
import React from 'react';
import Banner from './Banner';
import DoubleBanner from './Banner/DoubleBanner';
import Filter from './Filter';
import './index.scss';

function HomePage() {
  return (
    <Row className="container home">
      {/* Banners & filter */}
      <Col className="p-tb-32" span={24}>
        <Row>
          {/* Banners */}
          <Col span={24} md={16} className="banner p-r-16">
            <Banner />
          </Col>
          {/* Filters */}
          <Col span={24} md={8}>
            <Filter />
          </Col>
        </Row>
      </Col>

      {/* Danh sách Bất động sản nổi bật */}
      <Col className="bg-white p-16 bor-rad-8 box-sha-home" span={24}>
        <HouseList title="Bất động sản nổi bật" />
      </Col>

      {/* Danh sách Căn hộ chung cư */}
      <Col className="bg-white p-16 bor-rad-8 box-sha-home m-tb-32" span={24}>
        <DoubleBanner />
        <HouseList title="Căn hộ cao cấp" type={3} />
      </Col>

      {/* Một vài danh sách khác */}
      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={12}>
            <HouseList isDouble={true} title="Căn hộ mini" type={2} />
          </Col>
          <Col span={24} lg={12}>
            <HouseList isDouble={true} title="Căn hộ tập thể" type={4} />
          </Col>
        </Row>
      </Col>

      {/* Danh sách căn hộ penhouse */}
      <Col className="bg-white p-16 bor-rad-8 box-sha-home m-tb-32" span={24}>
        <DoubleBanner />
        <HouseList title="Căn hộ Penthouse" type={5} />
      </Col>

      {/* Danh sách nhà cho thuế */}
      <Col className="bg-white p-16 bor-rad-8 box-sha-home m-b-32" span={24}>
        <HouseList title="Nhà cho thuê" isHire={1} />
      </Col>

      {/* Nhà riêng và văn phòng */}
      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col span={24} md={12}>
            <HouseList isDouble={true} title="Nhà riêng" type={8} />
          </Col>
          <Col span={24} md={12}>
            <HouseList isDouble={true} title="Văn phòng" type={9} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HomePage;
