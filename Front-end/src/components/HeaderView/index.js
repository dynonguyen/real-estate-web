import {
  AccountBookOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import logoImg from 'assets/imgs/logo.png';
import smallLogoImg from 'assets/imgs/small-logo.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import constants from 'constants/index';
import helpers from 'helpers';
import loginApi from 'apis/loginApi';
import './index.scss';

// fn: Tạo ra menu dropdown
function generateMenuDropdown(menu) {
  const children = menu.map((item, index) => (
    <Menu.Item key={index}>
      <Link to={item.link}>{item.title}</Link>
    </Menu.Item>
  ));
  return (
    <Menu className="m-t-18 bor-rad-8" style={{ width: 200 }}>
      {children}
    </Menu>
  );
}
const saleMenu = generateMenuDropdown(constants.SALE_HOUSE_MENU);
const hireMenu = generateMenuDropdown(constants.HIRE_HOUSE_MENU);

function HeaderView() {
  const { isAuth } = useSelector((state) => state.authenticate);
  const user = useSelector((state) => state.user);

  // event: Đăng xuất
  const onLogout = async () => {
    try {
      const response = await loginApi.postLogout();
      if (response) {
        message.success('Đăng xuất thành công', 2);
        localStorage.removeItem(constants.REFRESH_TOKEN_KEY);
        location.reload();
      }
    } catch (error) {
      message.error('Đăng xuất thất bại', 2);
    }
  };

  // action menu cho dropdown
  const actionMenu = (
    <Menu className="m-t-18 bor-rad-8">
      <Menu.Item>
        <Button className="bor-rad-6 w-100">
          <Link to={constants.ROUTES.CONTACT_POST}>
            Đăng tin
            <EditOutlined />
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button className="bor-rad-6 w-100">
          <Link to={constants.ROUTES.LOGIN}>
            {isAuth ? helpers.reduceName(user.fullName, 8) : 'Đăng nhập'}
            <UserOutlined className="m-l-4" />
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button className="bor-rad-6 w-100">
          <Link to={constants.ROUTES.SIGNUP}>
            Đăng ký
            <UserAddOutlined className="m-l-4" />
          </Link>
        </Button>
      </Menu.Item>
    </Menu>
  );

  const actionAccount = (
    <Menu className="m-t-18 bor-rad-8">
      <Menu.Item>
        <Button
          onClick={onLogout}
          danger
          type="primary"
          className="bor-rad-6 w-100">
          Đăng xuất
          <LogoutOutlined />
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="primary" className="bor-rad-6 w-100">
          <Link to={constants.ROUTES.ACCOUNT}>
            Tài khoản
            <AccountBookOutlined className="m-l-4" />
          </Link>
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container-fluid header-view-wrapper">
      <div className="header-view container d-flex align-i-center justify-content-between">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} className="logo--lg" />
            <img src={smallLogoImg} className="logo--sm" />
          </Link>
        </div>

        {/* navbar */}

        <ul className="navbar d-flex m-b-0 align-item">
          <Dropdown overlay={saleMenu} placement="bottomCenter">
            <li>CẦN BÁN</li>
          </Dropdown>
          <Dropdown overlay={hireMenu} placement="bottomCenter">
            <li>CHO THUÊ</li>
          </Dropdown>
          <li>
            <a href="#footer">BÁO GIÁ</a>
          </li>
          <li>
            <Link to={constants.ROUTES.CONTACT_POST}>LIÊN HỆ</Link>
          </li>
        </ul>

        {/* Phần nút điều khiển */}
        <div className="action">
          <Button className="bor-rad-6">
            <Link to={constants.ROUTES.CONTACT_POST}>
              Đăng tin
              <EditOutlined className="m-l-8" />
            </Link>
          </Button>
          {/* Nếu chưa đăng nhập */}
          {!isAuth ? (
            <Button className="m-l-8 bor-rad-6">
              <Link to={constants.ROUTES.LOGIN}>
                Đăng nhập
                <UserOutlined className="m-l-4" />
              </Link>
            </Button>
          ) : (
            <Dropdown overlay={actionAccount}>
              <Button className="m-l-8 bor-rad-6">
                <Link to={constants.ROUTES.LOGIN}>
                  {helpers.reduceName(user.fullName, 12)}
                  <UserOutlined className="m-l-4" />
                </Link>
              </Button>
            </Dropdown>
          )}
          <Button className="m-l-8 bor-rad-6">
            <Link to={constants.ROUTES.SIGNUP}>
              Đăng ký <UserAddOutlined />
            </Link>
          </Button>
        </div>

        {/* Phần nút điều khiển more khi responsive */}
        <div className="action-md">
          <Dropdown overlay={actionMenu}>
            <MenuOutlined className="menu-icon" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default HeaderView;
