import {
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
  HeartFilled,
  PrinterFilled,
  TagFilled,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './index.scss';

function Description(props) {
  const { house, post } = props;
  const { code, details, content, start, end } = post;
  const { title, address, isHire, square, price, type } = house;
  const [isHideDesc, setIsHideDesc] = useState(false);
  const [isShowSeeMore, setIsShowSeeMore] = useState(false);

  // lọc dữ liệu renderr
  let typeHouse = constants.REAL_ESTATE_TYPES.find((item) => item.type == type);
  let typeStr = typeHouse ? typeHouse.title : 'Bất động sản khác';
  let province = address.split(',');

  // ev: hiển thị xem thêm bài viết chi tiết
  const onSeeMore = () => {
    setIsHideDesc(!isHideDesc);
  };

  // ev: lấy kích thước bài viết mô tả sau khi render
  useEffect(() => {
    const height = document.getElementById('descId').clientHeight;
    // Nếu chiều cao bài viết > 200px thì ẩn bớt
    if (height >= 200) {
      setIsShowSeeMore(true);
    }
  }, []);

  return (
    <div
      className="post-desc p-16 bg-white bor-rad-8 box-sha-home m-tb-32"
      id="descId">
      {/* Tên sản phẩm */}
      <p className="name p-b-8 p-lr-16 m-b-0 ">
        <b>{title}</b>
      </p>
      <div className="d-flex align-i-center action p-tb-8">
        <ClockCircleOutlined />
        <span className="m-r-12">{helpers.formatTime(start)}</span>
        <HeartFilled />
        <PrinterFilled />
        <TagFilled />
      </div>
      <Row className={`${!isHideDesc ? 'hide-desc' : ''}`}>
        <Col span={24} md={14}>
          <div className="content p-16">
            {content ? content : 'Đang cập nhật'}
          </div>
        </Col>
        <Col className="details bor-rad-6 p-16" span={24} md={10}>
          {/* Mã bài đăng */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Mã tin</h3>
            <span className="value font-size-16px">{code}</span>
          </div>

          {/* Loại */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Loại</h3>
            <span className="value font-size-16px">{typeStr}</span>
          </div>

          {/* Giá */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Giá cả</h3>
            <span className="value font-size-16px p-tb-4 p-lr-8 price bor-rad-6">
              {price
                ? `${price} ${isHire ? ' Tỷ' : ' Triệu/tháng'}`
                : 'Thoả thuận'}
            </span>
          </div>

          {/* Diện tích */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Diện tích</h3>
            <span className="value font-size-16px">
              {square ? square : 'Liên hệ'} m<sup>2</sup>
            </span>
          </div>

          {/* Tỉnh thành */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Tỉnh/thành</h3>
            <span className="value font-size-16px">
              {province.length > 0 ? province[province.length - 1] : 'Liên hệ'}
            </span>
          </div>

          {/*  Địa chỉ cụ thể */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Địa chỉ</h3>
            <span className="value font-size-16px">
              {address ? address : 'Liên hệ'}
            </span>
          </div>

          {/*  Ngày đăng */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Ngày đăng</h3>
            <span className="value font-size-16px">
              {helpers.formatTime(start)}
            </span>
          </div>

          {/*  Ngày hết hạn */}
          <div className="item d-flex justify-content-between m-b-12">
            <h3 className="key font-size-18px">Ngày kết thúc</h3>
            <span className="value font-size-16px">
              {helpers.formatTime(end)}
            </span>
          </div>

          {/* Các thông tin khác */}
          {details.map((item, index) => (
            <div
              key={index}
              className="item d-flex justify-content-between m-b-12">
              <h3 className="key font-size-18px">{item.key}: </h3>
              <span className="value font-size-16px">{item.value}</span>
            </div>
          ))}
        </Col>
      </Row>
      {/* hiển thị chế độ xem thêm */}
      {isShowSeeMore && (
        <h3
          className="t-center p-tb-16 see-more ease-trans"
          onClick={onSeeMore}>
          {isHideDesc ? 'Thu gọn ' : 'Xem thêm '}
          nội dung &nbsp;
          {isHideDesc ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </h3>
      )}
    </div>
  );
}

Description.propTypes = {
  post: PropTypes.any,
  house: PropTypes.any,
};

export default Description;
