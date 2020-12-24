// Hiển thị 1 danh sách các bđs cùng loại
import { Spin } from 'antd';
import houseApi from 'apis/houseApi';
import HouseListView from 'components/HouseListView';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function HouseList(props) {
  const { id, type, isHire, title, noHouse, isDouble } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const span = isDouble
    ? { span: 24, xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 }
    : { span: 24, xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6 };

  // Lấy ds nhà
  useEffect(() => {
    let isSubscribe = true;
    async function getHouseList() {
      try {
        const response = await houseApi.getHouseList(type, isHire, noHouse, id);
        if (response && isSubscribe) {
          setList(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
        throw error;
      }
    }

    getHouseList();
    return () => (isSubscribe = false);
  }, [id, type, isHire]);

  // rendering...
  return (
    <>
      {isLoading === false && list.length > 0 ? (
        <HouseListView span={span} list={list} title={title} />
      ) : (
        <Spin size="large" className="trans-center" />
      )}
    </>
  );
}

HouseList.defaultProps = {
  id: '',
  // -1 là tìm cả 2
  isHire: -1,
  type: -1,
  title: 'Bất động sản liên quan',
  noHouse: 16,
  isDouble: false,
};

HouseList.propTypes = {
  id: PropTypes.string,
  isHire: PropTypes.number,
  type: PropTypes.number,
  title: PropTypes.string,
  // số lượng cần lấy để hiển thị
  noHouse: PropTypes.number,
  // 2 danh sách liền kề thì span sẽ ít hơn
  isDouble: PropTypes.bool,
};

export default HouseList;
