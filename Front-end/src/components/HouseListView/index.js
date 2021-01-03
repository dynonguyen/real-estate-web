import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import HouseView from 'components/HouseView';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// rendering ...
function HouseListView(props) {
  const { list, title, span } = props;

  const perPage = useRef(1);
  const [page, setPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener('resize', () => setWindowWidth(window.innerWidth));

  // fn: phân trang
  const paginate = (list) => {
    const windowSize = helpers.convertWidthScreen(windowWidth);
    if (span.hasOwnProperty(windowSize))
      perPage.current = 24 / span[windowSize];
    else {
      const spanValues = Object.values(span);
      let min = Math.min(...spanValues);
      perPage.current = 24 / min;
    }

    return list.slice(perPage.current * (page - 1), perPage.current * page);
  };

  // fn: Hiển thị danh sách nhà
  const showHouseList = (list) => {
    const listSliced = paginate(list);

    return listSliced.map((house, index) => {
      const { isHire, title, avt, price, square, address, _id } = house;

      return (
        <Col key={index} {...span}>
          <Link to={`${constants.ROUTES.HOUSE}/${_id}`} className="item">
            <HouseView
              type={isHire}
              title={title}
              avt={avt}
              price={price}
              address={address}
              square={square}
            />
          </Link>
        </Col>
      );
    });
  };

  return (
    <Row
      className="house-list-view"
      gutter={[16, 8]}
      style={{ borderRadius: 8 }}>
      {title !== '' && (
        <Col span={24} className="p-8">
          <h2 className="font-weight-700">{title}</h2>
          <div className="underline-title"></div>
        </Col>
      )}
      <Col span={24}>
        <Row gutter={[16, 16]} className="m-t-16">
          {showHouseList(list, span)}
        </Row>
      </Col>

      {/* Mũi tên chuyển trang */}
      <LeftCircleOutlined
        className={`arrow arrow-left ${page <= 1 ? 'disabled' : ''}`}
        onClick={() => setPage(page - 1)}
      />
      <RightCircleOutlined
        className={`arrow arrow-right ${
          page >= Math.ceil(list.length / perPage.current) ? 'disabled' : ''
        }`}
        onClick={() => setPage(page + 1)}
      />
    </Row>
  );
}

HouseListView.defaultProps = {
  list: [],
  title: '',
  span: { span: 24, xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 4 },
};

HouseListView.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  span: PropTypes.object,
};

export default HouseListView;
