import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import React from 'react';
import './index.scss';
import bannerImg from 'assets/imgs/banner-1.jpg';
import bannerImg_2 from 'assets/imgs/banner-2.jpg';
import bannerImg_3 from 'assets/imgs/banner-3.jpg';
import bannerImg_4 from 'assets/imgs/banner-4.jpg';
import bannerImg_5 from 'assets/imgs/banner-5.jpg';
import bannerImg_6 from 'assets/imgs/banner-6.jpg';
import bannerImg_7 from 'assets/imgs/banner-6.jpg';

function Banner(props) {
  const { list } = props;
  return (
    <Carousel autoplay>
      {list.map((item, index) => (
        <img
          className="banner-item box-sha-home bor-rad-4"
          src={item}
          key={index}
        />
      ))}
    </Carousel>
  );
}

Banner.defaultProps = {
  list: [
    bannerImg,
    bannerImg_2,
    bannerImg_3,
    bannerImg_4,
    bannerImg_5,
    bannerImg_6,
    bannerImg_7,
  ],
};

Banner.propTypes = {
  list: PropTypes.array,
};

export default Banner;
