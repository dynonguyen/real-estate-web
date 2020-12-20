import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import HouseList from 'containers/HouseList';
import React from 'react';
import Description from './Description';
import './index.scss';
import PostOverview from './Overview';
import advBanner_1 from 'assets/imgs/v-banner.jpg';
import advBanner_2 from 'assets/imgs/v-banner-2.jpg';
import HouseView from 'components/HouseView';

const AddressMap = () => {
  return (
    <div className="google-map-code">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.46045275533!2d106.4150326722176!3d10.754666397815264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sin!4v1608472643808!5m2!1sen!2sin"
        width="100%"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"></iframe>
    </div>
  );
};

function PostDetail(props) {
  const { house, post } = props;
  const { catalogs } = post;
  const { avt, host } = house;

  return (
    <Row className="post-detail container m-t-32">
      {/* tổng quan về nhà */}
      <Col span={24} lg={18}>
        <PostOverview avt={avt} catalogs={catalogs} host={host} />
      </Col>
      {/* quảng cáo */}
      <Col span={0} lg={6} className="p-lr-16">
        <div className="adv">
          <img
            className="box-sha-home"
            style={{ maxHeight: 500, width: '100%' }}
            src={advBanner_1}
          />
        </div>
      </Col>
      {/* mô tả chi tiết */}
      <Col span={24} lg={18}>
        <Description house={house} host={host} />
      </Col>
      {/* quảng cáo */}
      <Col span={0} lg={6} className="p-lr-16 m-t-32">
        <a
          href="http://www.batdongsan.vn/tin-tuc/chat-luong-du-an-dau-an-lam-nen-thuong-hieu-tan-hoang-minh.html"
          target="blank">
          <h3 className="font-size-18px m-b-8">
            <b>TIN NỔI BẬT</b>
          </h3>
          <HouseView
            avt="http://www.batdongsan.vn/FileManager/Upload/05092018/image001-1005511.jpg"
            title="Chất lượng dự án: Dấu ấn làm nên thương hiệu Tân Hoàng Minh"
          />
        </a>
      </Col>
      <Col span={24} className="bg-white p-16 bor-rad-8 m-b-32 box-sha-home">
        <HouseList title="Bất động sản nổi bật" />
      </Col>
      {/* embed gg map */}
      <Col span={24} className="m-b-32 box-sha-home">
        {AddressMap()}
      </Col>
    </Row>
  );
}

PostDetail.propTypes = {
  house: PropTypes.object,
  post: PropTypes.object,
};

export default PostDetail;
