import { Col, Pagination, Row, Spin } from 'antd';
import houseApi from 'apis/houseApi';
import HouseView from 'components/HouseView';
import constants from 'constants/index';
import Filter from 'containers/HomePage/Filter';
import helpers from 'helpers';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function FilterPage() {
  const params = useLocation().search;
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 8;
  // lấy kết quả filter
  useEffect(() => {
    let isSubscribe = true;

    async function getFilterList() {
      try {
        const conditions = helpers.getQueryVariable(params);
        const result = await houseApi.filterHouse(conditions, page, perPage);
        if (result && isSubscribe) {
          setList(result.data.list);
          setTotal(result.data.count);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
      }
    }

    getFilterList();
    return () => {
      isSubscribe = false;
    };
  }, [page, params]);

  return (
    <div className="container m-tb-32" style={{ minHeight: '100vh' }}>
      {isLoading ? (
        <Spin className="trans-center" tip="Đang tải dữ liệu ..." />
      ) : (
        <>
          {/* filter result */}
          <h1>
            Có <b>{total}</b> kết quả tìm kiếm:
          </h1>
          <div className="underline-title"></div>
          <Row
            className="bg-white p-16 m-t-16 bor-rad-8 box-sha-home"
            gutter={[16, 16]}>
            {list &&
              list.map((item, index) => (
                <Col key={index} span={24} sm={12} lg={8} xl={6}>
                  <Link to={`${constants.ROUTES.HOUSE}/${item._id}`}>
                    <HouseView
                      avt={item.avt}
                      price={item.price}
                      square={item.square}
                      title={item.title}
                      type={item.isHire}
                      address={item.address}
                    />
                  </Link>
                </Col>
              ))}
          </Row>
          <div>
            <Pagination
              className="t-center m-t-16"
              showSizeChanger={false}
              pageSize={perPage}
              current={page}
              total={total}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FilterPage;
