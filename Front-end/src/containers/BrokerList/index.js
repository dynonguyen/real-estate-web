import { Col, Pagination, Row, Spin } from 'antd';
import userApi from 'apis/userApi';
import BrokerCard from 'components/BrokerCard';
import React, { useEffect, useState } from 'react';

function BrokerList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 4;

  const listSliced = list.slice((page - 1) * perPage, page * perPage);
  // get borker list
  useEffect(() => {
    let isSubscribe = true;
    async function getBrokerList() {
      try {
        const response = await userApi.getBrokerList();
        if (response) {
          setIsLoading(false);
          if (isSubscribe) setList(response.data);
        }
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    getBrokerList();
    return () => (isSubscribe = false);
  }, []);

  return (
    <div className="container p-tb-24 pos-relative" style={{ minHeight: 200 }}>
      <div>
        <h2 className="font-weight-700">Môi giới bất động sản</h2>
        <div className="underline-title"></div>
      </div>
      <div>
        {isLoading && (
          <Spin className="trans-center" size="large" tip="Đang cập nhật..." />
        )}
        {listSliced.length > 0 && (
          <Row className="p-tb-16" gutter={[16, 16]}>
            {listSliced.map((item, index) => (
              <Col key={index} span={12} md={6}>
                <BrokerCard
                  email={item.email}
                  fb={item.fb}
                  name={item.name}
                  phone={item.phone}
                />
              </Col>
            ))}
            <Pagination
              className="m-0-auto p-t-16"
              onChange={(p) => setPage(p)}
              current={page}
              pageSize={perPage}
              showLessItems={true}
              total={Math.round(list.length / perPage)}
            />
          </Row>
        )}
      </div>
    </div>
  );
}

export default BrokerList;
