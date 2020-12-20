import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <Result
      style={{ height: '100vh' }}
      status="404"
      title="404 Not Found"
      subTitle="Xin lỗi, trang bạn truy cập đang bị lỗi hoặc không thể tìm thấy trang."
      extra={
        <Button type="primary">
          <Link to="/">Về trang chủ</Link>
        </Button>
      }
    />
  );
}

NotFound.propTypes = {};

export default NotFound;
