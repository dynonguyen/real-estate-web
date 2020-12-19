import { Carousel } from 'antd';
import bannerImg from 'assets/imgs/banner-1.jpg';
import bannerImg_2 from 'assets/imgs/banner-2.jpg';
import bannerImg_3 from 'assets/imgs/banner-3.jpg';
import bannerImg_4 from 'assets/imgs/banner-4.jpg';
import bannerImg_5 from 'assets/imgs/banner-5.jpg';
import bannerImg_6 from 'assets/imgs/banner-6.jpg';
import bannerImg_7 from 'assets/imgs/banner-7.jpg';
import douBannerImg from 'assets/imgs/d_banner-1.jpg';
import douBannerImg_2 from 'assets/imgs/d_banner-2.jpg';
import douBannerImg_3 from 'assets/imgs/d_banner-3.jpg';
import douBannerImg_4 from 'assets/imgs/d_banner-4.jpg';
import douBannerImg_5 from 'assets/imgs/d_banner-5.jpg';
import douBannerImg_6 from 'assets/imgs/d_banner-6.jpg';
import douBannerImg_7 from 'assets/imgs/d_banner-7.jpg';
import PropTypes from 'prop-types';
import React from 'react';
import '../index.scss';

function DoubleBanner(props) {
  const { list } = props;

  const showBanner = (list) => {
    let result = [];
    for (let i = 0; i < list.length - 1; ++i) {
      result.push(
        <div className="banner-double" key={i}>
          <img
            className="banner-item banner-double--1 w-50 p-8"
            src={list[i]}
          />
          <img
            className="banner-item banner-double--2 w-50 p-8"
            src={list[i + 1]}
          />
        </div>,
      );
    }
    return result;
  };

  return (
    <Carousel autoplay dots={false}>
      {showBanner(list)}
    </Carousel>
  );
}

DoubleBanner.defaultProps = {
  list: [
    douBannerImg,
    douBannerImg_2,
    douBannerImg_3,
    douBannerImg_4,
    douBannerImg_5,
    douBannerImg_6,
    douBannerImg_7,
    bannerImg,
    bannerImg_2,
    bannerImg_3,
    bannerImg_4,
    bannerImg_5,
    bannerImg_6,
    bannerImg_7,
  ],
};

DoubleBanner.propTypes = {
  list: PropTypes.array,
};

export default DoubleBanner;
