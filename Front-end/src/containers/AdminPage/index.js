import {
  BarChartOutlined,
  DashboardOutlined,
  EyeOutlined,
  HomeOutlined,
  IdcardOutlined,
  NotificationOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import SubMenu from 'antd/lib/menu/SubMenu';
import defaultAvt from 'assets/imgs/default-avt.png';
import logo from 'assets/imgs/small-logo.png';
import Filter from 'containers/HomePage/Filter';
import React, { useState } from 'react';
import AddPost from './AddPost';
import './index.scss';
import Login from './Login';
import SeeCustomer from './SeeCustomer';
import SeeHouse from './SeeHouse';

const mainColor = '#191932';
const menuList = [
  {
    key: 'd',
    title: 'Tổng quan',
    icon: <DashboardOutlined />,
    children: [],
  },
  {
    key: 'p',
    title: 'Bất động sản',
    icon: <ShoppingCartOutlined />,
    children: [
      { key: 'p0', title: 'Xem', icon: <EyeOutlined /> },
      { key: 'p1', title: 'Thêm', icon: <PlusCircleOutlined /> },
    ],
  },
  {
    key: 'c',
    title: 'Khách hàng',
    icon: <UserOutlined />,
    children: [],
  },
  {
    key: 'a',
    title: 'Tài khoản Admin',
    icon: <IdcardOutlined />,
    children: [],
  },
  {
    key: 's',
    title: 'Thống kê',
    icon: <BarChartOutlined />,
    children: [],
  },
  {
    key: 'm',
    title: 'Chiến lược',
    icon: <NotificationOutlined />,
    children: [],
  },
];

function AdminPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [keyMenu, setKeyMenu] = useState('p1');
  const [userName, setUserName] = useState('Admin');
  const onLogin = (isLogin, name) => {
    if (isLogin) {
      setIsLogin(isLogin);
      setUserName(name);
    }
  };

  // fn: Xử lý khi chọn item
  const handleSelected = (e) => {
    const { key } = e;
    setKeyMenu(key);
  };

  // fn: Show Title Selected
  const showTitleSelected = (key) => {
    let result = 'Tổng quan';
    menuList.forEach((item) => {
      if (item.key === key) result = item.title;
      item.children.forEach((child) => {
        if (child.key === key) result = `${item.title} > ${child.title}`;
      });
    });
    return result;
  };

  // fn: render menu
  const renderMenuItem = () => {
    // return MenuItem if children = null
    return menuList.map((item, index) => {
      const { key, title, icon, children } = item;
      if (children.length === 0)
        return (
          <Menu.Item className="menu-item" key={key} icon={icon}>
            <span className="menu-item-title">{title}</span>
          </Menu.Item>
        );
      // else render SubMenu
      return (
        <SubMenu className="menu-item" key={key} icon={icon} title={title}>
          {children.map((child, index) => (
            <Menu.Item className="menu-item" key={child.key} icon={child.icon}>
              <span className="menu-item-title">{child.title}</span>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    });
  };

  // fn: render component tương ứng
  const renderMenuComponent = (key) => {
    switch (key) {
      case 'd':
        break;
      case 'p0':
        return <SeeHouse />;
      case 'p1':
        return <AddPost />;
      case 'c':
        return <SeeCustomer />;
      case 'a':
        break;
      case 'm':
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="admin-page" style={{ backgroundColor: '#e5e5e5' }}>
          {/* header */}
          <div
            className="d-flex align-i-center"
            style={{ height: '72px', backgroundColor: mainColor }}>
            <div className="logo" style={{ flexBasis: '180px' }}>
              <img
                className="m-t-5 m-l-50"
                width="44x"
                height="44px"
                src={logo}
              />
            </div>
            <div className="flex-grow-1 d-flex align-i-center">
              <h2 className="t-color-primary flex-grow-1 p-l-44 main-title">
                <span>Trang Admin &gt; </span>
                <span className="option-title">
                  {showTitleSelected(keyMenu)}
                </span>
              </h2>
              <a
                href="/"
                className="p-r-24 t-color-primary font-weight-500 p-b-10">
                <HomeOutlined
                  className="font-size-28px t-color-primary m-r-10"
                  style={{ transform: 'translateY(3px)' }}
                />
                <span className="open-web-title">Mở trang web</span>
              </a>
              <div className="user-admin p-r-44 t-color-primary font-weight-500">
                <Avatar size={36} className="m-r-10" src={defaultAvt} />
                <span className="user-admin-title">{userName}</span>
              </div>
            </div>
          </div>

          <div className="d-flex">
            {/* menu dashboard */}
            <Menu
              className="menu"
              theme="dark"
              onClick={handleSelected}
              style={{
                height: 'inherit',
                minHeight: '100vh',
                backgroundColor: mainColor,
                flexBasis: '200px',
              }}
              defaultSelectedKeys={keyMenu}
              mode="inline">
              {renderMenuItem()}
            </Menu>

            {/* main contents */}
            <div className="flex-grow-1">{renderMenuComponent(keyMenu)}</div>
          </div>
        </div>
      ) : (
        <div className="trans-center bg-white p-32 bor-rad-8 box-sha-home">
          <h2 className="m-b-16 t-center">Đăng nhập với quyền Admin</h2>
          <Login onLogin={onLogin} />
        </div>
      )}
    </>
  );
}

export default AdminPage;
