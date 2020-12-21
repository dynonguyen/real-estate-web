import {
  ContactsOutlined,
  FacebookOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function ContactPost() {
  return (
    <Result
      icon={<ContactsOutlined />}
      title={
        <h4>
          Liên hệ trực tiếp với chúng tôi để đăng tin bán/cho thuê nhà. Cảm ơn !
        </h4>
      }
      extra={
        <>
          <Button type="primary" size="large">
            <Link to="/">
              Về trang chủ <HomeOutlined />
            </Link>
          </Button>
          <Button type="primary" danger size="large">
            <a href="https://fb.com" target="blank">
              Tư vấn ngay
              <FacebookOutlined className="m-l-8" />
            </a>
          </Button>
        </>
      }
    />
  );
}

export default ContactPost;
