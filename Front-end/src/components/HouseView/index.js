import { Card } from 'antd';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import defaultAvt from 'assets/imgs/small-logo.png';
import './index.scss';

// rendering ...
function HomeView(props) {
  const {
    type,
    title,
    price,
    avt,
    square,
    address,
    action,
    height,
    maxWidth,
  } = props;

  const priceRender =
    price > 0
      ? type
        ? `${price.toFixed(2)} Tr/th`
        : `${(price / 1000).toFixed(2)} Tỷ`
      : 'Thoả thuận';

  // set height cho các avt của nhà
  useEffect(() => {
    document
      .querySelectorAll('.ant-card-cover')
      .forEach((item) => (item.style.height = `${height / 2}px`));
  }, []);

  // rendering ...
  return (
    <Card
      className="home-view"
      id="card-item"
      style={{ height }}
      loading={false}
      cover={
        <img
          className="trans-center max-w-100 max-h-100"
          src={avt}
          alt="House Photo"
        />
      }
      hoverable>
      {/* Tiêu đề nhà */}
      <div className="home-view-title font-weight-700 font-size-16px m-b-12">
        {helpers.reduceName(title, 64)}
      </div>

      {/* Giá & diện tích nhà */}
      <div>
        <b className="home-view-price p-lr-12 p-tb-4 bor-rad-6 m-r-12">
          {priceRender}
        </b>
        {square > 0 ? (
          <span className="home-view-square">
            {square} m<sup>2</sup>
          </span>
        ) : (
          <span className="home-view-square">Liên hệ</span>
        )}
      </div>

      {/* Địa chỉ */}
      <p className="m-t-12 m-b-0 font-size-12px home-view-address">
        {helpers.reduceName(address, 72)}
      </p>

      {/* Các nút bấm thêm nếu có cho trang admin */}
      <div className="d-flex m-t-10 justify-content-end">
        {action.length > 0 && action.map((Item) => Item)}
      </div>
    </Card>
  );
}

// check prop types
HomeView.propTypes = {
  type: PropTypes.bool,
  action: PropTypes.array,
  address: PropTypes.string,
  avt: PropTypes.string,
  height: PropTypes.number,
  maxWidth: PropTypes.number,
  price: PropTypes.number,
  square: PropTypes.number,
  title: PropTypes.string,
};

// default props
HomeView.defaultProps = {
  type: false,
  action: [],
  address: '',
  avt: defaultAvt,
  height: 350,
  maxWidth: 280,
  title: '',
};

export default HomeView;
