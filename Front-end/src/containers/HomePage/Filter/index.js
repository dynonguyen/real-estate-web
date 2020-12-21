import { Button, message, Select } from 'antd';
import addressApi from 'apis/addressApi';
import constants from 'constants/index';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './index.scss';
const { Option } = Select;

// fn: hiển thị danh sách option
function showOptionList(list) {
  if (list) {
    return list.map((item, index) => (
      <Option key={index} value={item.type}>
        {item.title}
      </Option>
    ));
  }
}

function Filter() {
  const [isHire, setIsHire] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [filter, setFilter] = useState({ status: false, to: '' });
  const initFields = {
    type: -1,
    province: -1,
    district: -1,
    square: -1,
    price: -1,
  };
  const fields = useRef(initFields);

  // fn: lấy danh sách tỉnh thành
  useEffect(() => {
    // dùng để cleanup effect
    let isSubscribe = true;

    async function getProvinceList() {
      try {
        const response = await addressApi.getProvince();
        if (response) {
          if (isSubscribe) setProvinceList(response.data);
        }
      } catch (error) {}
    }
    getProvinceList();
    // cleanup
    return () => (isSubscribe = false);
  }, []);

  // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
  const getDistrictList = async (provinceId = 0) => {
    try {
      const response = await addressApi.getDistrict(provinceId);
      if (response) {
        setDistrictList(response.data);
      }
    } catch (error) {
      throw error;
    }
  };

  // event: Tìm kiếm nhà
  const onSearch = async () => {
    try {
      // Lọc các điều kiện
      let conditions = { isHire };
      for (let key in fields.current) {
        if (fields.current[key] !== initFields[key]) {
          let obj = {};
          obj[key] = fields.current[key];
          Object.assign(conditions, obj);
        }
      }
      // redirect link
      let link = constants.ROUTES.FILTER + '?';
      for (let key in conditions) {
        link += `${key.toString()}=${conditions[key]}&`;
      }
      link = link.slice(0, link.length - 1);

      // redirect to filter
      setFilter({ status: true, to: link });
    } catch (error) {
      throw error;
    }
  };

  // Danh sách giá hiển thị dựa vào lựa chọn thuê hay bán
  const priceList = isHire
    ? constants.HIRE_PRICE_TYPES
    : constants.SALE_PRICE_TYPES;

  // rendering ...
  return (
    <>
      {filter.status ? (
        <Redirect to={filter.to} />
      ) : (
        <div className="bg-white p-16 bor-rad-6 home-filter">
          {/* Loại nhà (thuê, bán) */}
          <div className="type p-b-4">
            <span
              className={`p-6 ${isHire ? '' : 'type-active'}`}
              onClick={() => setIsHire(!isHire)}>
              Nhà Bán
            </span>
            <span
              className={`p-6 ${isHire ? 'type-active' : ''}`}
              onClick={() => setIsHire(!isHire)}>
              Cho Thuê
            </span>
          </div>

          <div>
            {/* loại bất động sản */}
            <Select
              className="w-100 m-t-8"
              size="middle"
              showArrow
              showSearch
              placeholder="Loại bất động sản"
              onChange={(value) => (fields.current.type = value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {showOptionList(constants.REAL_ESTATE_TYPES)}
            </Select>

            {/* Tỉnh thành */}
            <Select
              className="w-100 m-t-8"
              size="middle"
              showArrow
              showSearch
              placeholder="Tỉnh/Thành phố"
              onChange={(id) => {
                getDistrictList(id);
                fields.current.province = id;
                fields.current.district = -1;
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {provinceList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>

            {/* Huyện, xã */}
            <Select
              className="w-100 m-t-8"
              size="middle"
              showArrow
              showSearch
              placeholder="Quận/Huyện"
              onChange={(value) => (fields.current.district = value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {districtList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>

            {/* Diện tích */}
            <Select
              className="w-100 m-t-8"
              size="middle"
              showArrow
              showSearch
              placeholder="Diện tích"
              onChange={(value) => (fields.current.square = value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {showOptionList(constants.SQUARE_TYPES)}
            </Select>

            {/* Giá */}
            <Select
              className="w-100 m-t-8"
              size="middle"
              showArrow
              showSearch
              placeholder="Mức giá"
              onChange={(value) => (fields.current.price = value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {showOptionList(priceList)}
            </Select>

            {/* Button tìm kiếm */}
            <Button type="primary m-t-12 w-100" size="large" onClick={onSearch}>
              Tìm kiếm
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
