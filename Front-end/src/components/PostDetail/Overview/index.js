import { PhoneFilled } from '@ant-design/icons';
import { Button, Col, Image, Input, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import userApi from 'apis/userApi';
import ImgLoadFailed from 'assets/imgs/loading-img-failed.png';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './index.scss';

function PostOverview(props) {
  const { avt, catalogs, host } = props;
  const [author, setAuthor] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  });
  const { fullName, phone, email, address } = author;
  const [avtIndex, setAvtIndex] = useState(0);

  // event: lấy thông tin chủ nhà
  useEffect(() => {
    let isSubscribe = true;
    async function getInfoUser() {
      try {
        const user = await userApi.getInfoUser(host);
        if (user && isSubscribe) {
          setAuthor(user.data);
        }
      } catch (error) {}
    }
    getInfoUser();
    return () => {
      isSubscribe = false;
    };
  }, []);

  // fn: hiên thị danh sách hình ảnh nhà
  const showCatalogs = (catalog) => {
    return catalog.map((item, index) => (
      <Image
        key={index}
        src={item}
        width={48}
        className={`catalog-item p-8 ${index === avtIndex ? 'active' : ''}`}
        onMouseEnter={() => setAvtIndex(index)}
      />
    ));
  };

  return (
    <Row className="post-overview bg-white bor-rad-8 box-sha-home">
      {/* Hình ảnh nhà*/}
      <Col span={24} md={16}>
        <Image
          style={{ height: 400 }}
          fallback={ImgLoadFailed}
          src={catalogs ? catalogs[avtIndex] : ImgLoadFailed}
        />
        <div className="d-flex w-100 bg-white p-8">
          {showCatalogs(catalogs)}
        </div>
      </Col>

      {/* thông tin người đăng */}
      <Col className="p-16" span={24} md={8}>
        <div className="d-flex">
          <Avatar
            className="m-r-12"
            style={{ width: 50, height: 50 }}
            src={avt ? avt : ImgLoadFailed}
          />
          <div>
            <h4 className="name">
              {fullName ? helpers.reduceName(fullName, 64) : 'Đang cập nhật'}
            </h4>
            <h4 className="author-contact">
              {email ? helpers.reduceName(email, 64) : 'Đang cập nhật'}
            </h4>
            <h4 className="author-contact">
              {helpers.reduceName(address, 120)}
            </h4>
          </div>
        </div>
        <Button size="large" className="w-100 m-t-16 m-b-8" type="dashed">
          <PhoneFilled rotate={90} className="font-size-16px p-r-8" />
          <b>{phone ? phone : 'Đang cập nhật'}</b>
        </Button>
        <Input className="m-tb-8" size="large" placeholder="Họ và tên" />
        <Input className="m-tb-8" size="large" placeholder="Email" />
        <Input className="m-tb-8" size="large" placeholder="Số điện thoại" />
        <Input.TextArea
          className="m-tb-8"
          defaultValue="Tôi cần tìm hiểu thông tin về sản phẩm này, liên hệ lại cho tôi trong thời gian sớm nhât.
          Xin cảm ơn!"
          size="large"
          autoSize
          maxLength={1000}
          allowClear
          showCount
          placeholder="Nội dung"
        />
        <Button size="large" className="w-100" type="primary">
          Gửi tin nhắn
        </Button>
      </Col>
    </Row>
  );
}

PostOverview.propTypes = {
  // id người chủ bài viết
  host: PropTypes.string,
  avt: PropTypes.string,
  catalogs: PropTypes.any,
};

export default PostOverview;
