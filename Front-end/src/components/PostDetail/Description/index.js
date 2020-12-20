import PropTypes from 'prop-types';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
  HeartFilled,
  PrinterFilled,
  TagFilled,
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

const content = `Nhà văn phòng 9 tầng do chủ nhà trực tiếp quản lý và cho thuê có thiết kế hiện đại. Mặt tiền thoáng và rộng. Tọa lạc tại vị trí giao thông thuận tiện (gần ngã tư Chùa Bộc - Thái Hà). Là địa điểm lý tưởng cho các công ty, doanh nghiệp chọn làm văn phòng giao dịch và làm việc.
- Diện tích sàn: 400m2 x 9 tầng.
- Diện tích sử dụng: 265m2/sàn.
- Diện tích hiện trống:
+ 82m2 VP tại tầng 2. Giá 17 triệu/tháng.
+ 170m2 VP tại tầng 8
- Văn phòng thiết kế hiện ��ại:
+ Có điều hòa âm trần.
+ Hệ thống ánh sáng đạt chuẩn.
+ Thang máy đôi tốc độ cao.
+ Trạm điện riêng.
+ Máy phát điện dự phòng công suất lớn.
+ Camera an ninh và bảo vệ 24/24h.
+ Tầng hầm để xe.
+ Dịch vụ tòa nhà chuyên nghiệp.
Đặc biệt, miễn phí làm ngoài giờ (kể cả ngày lễ và chủ nhật).
LH trực tiếp chủ nhà: Nguyễn Giang 098.664.6169.
Cam kết:
- Thông tin và hình ảnh trung thực.
- Làm việc với chủ nhà
- Chủ nhà trực tiếp quản lý và cho thuê`;

const details = [
  { key: 'Mã tin', value: '296161' },
  { key: 'Loại', value: 'Nhà riêng' },
  { key: 'Tỉnh thành', value: 'Sài Gòn' },
  { key: 'Địa chỉ', value: '18/11 Thái Hà, Trung Liệt, Đống Đa, Hà Nội' },
  { key: 'Ngày đăng', value: '18/11/2020' },
  { key: 'Mã tin', value: '296161' },
  { key: 'Loại', value: 'Nhà riêng' },
  { key: 'Tỉnh thành', value: 'Sài Gòn' },
  { key: 'Địa chỉ', value: '18/11 Thái Hà, Trung Liệt, Đống Đa, Hà Nội' },
  { key: 'Ngày đăng', value: '18/11/2020' },
  { key: 'Mã tin', value: '296161' },
  { key: 'Loại', value: 'Nhà riêng' },
  { key: 'Tỉnh thành', value: 'Sài Gòn' },
  { key: 'Địa chỉ', value: '18/11 Thái Hà, Trung Liệt, Đống Đa, Hà Nội' },
  { key: 'Ngày đăng', value: '18/11/2020' },
];

function Description(props) {
  const { house, host } = props;
  console.log(house);
  const { title, address, isHire, square, price, type } = house;
  const [isHideDesc, setIsHideDesc] = useState(false);
  const [isShowSeeMore, setIsShowSeeMore] = useState(false);

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
        <b>
          82 và 170m2 cho thuê tại nhà vp 9 tầng tại phố thái hà. giá 17
          triệu/tháng. lh trực tiếp chủ nhà 0986646169
        </b>
      </p>
      <div className="d-flex align-i-center action p-tb-8">
        <ClockCircleOutlined />
        <span className="m-r-12">03/12/2020</span>
        <HeartFilled />
        <PrinterFilled />
        <TagFilled />
      </div>
      <Row className={`${!isHideDesc ? 'hide-desc' : ''}`}>
        <Col span={24} md={14}>
          <div className="content p-16">{content}</div>
        </Col>
        <Col className="details bor-rad-6 p-16" span={24} md={10}>
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
  host: PropTypes.any,
  house: PropTypes.any,
};

export default Description;
