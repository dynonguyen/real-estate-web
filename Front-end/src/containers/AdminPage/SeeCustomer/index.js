import { message, Pagination, Table } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';

function generateDataList(list) {
  return list.map((item, index) => {
    const { accountId, fullName, birthday, gender, phone, address } = item;
    return {
      key: index,
      accountId,
      fullName,
      birthday,
      gender,
      phone,
      address,
    };
  });
}

function SeeCustomer() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 20;
  const data = generateDataList(list);

  const columns = [
    {
      title: 'Account Id',
      key: 'accountId',
      dataIndex: 'accountId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Họ Tên',
      key: 'fullName',
      dataIndex: 'fullName',
    },
    {
      title: 'Ngày sinh',
      key: 'birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'giới tính',
      key: 'gender',
      dataIndex: 'gender',
      render: (gender) => {
        return gender ? 'Nam' : 'Nữ';
      },
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      dataIndex: 'address',
    },
  ];

  // event: Lấy danh sách sản phẩm
  useEffect(() => {
    let isSubscribe = true;
    async function getList() {
      try {
        const response = await adminApi.getAllCustomer(page, perPage);
        if (response && isSubscribe) {
          setList(response.data.list);
          setTotal(response.data.count);
        }
      } catch (error) {
        message.error('Lấy danh sách thất bại, thử lại');
      }
    }
    getList();
    return () => {
      isSubscribe = false;
    };
  }, [page]);

  // rendering
  return (
    <>
      <Table
        pagination={false}
        className="p-8 admin-see-house"
        columns={columns}
        dataSource={data}
      />
      <Pagination
        className="t-center m-tb-16"
        current={page}
        total={total}
        pageSize={perPage}
        showSizeChanger={false}
        onChange={(p) => setPage(p)}
      />
    </>
  );
}

export default SeeCustomer;
