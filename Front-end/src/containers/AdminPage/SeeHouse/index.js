import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { message, Pagination, Table, Tag } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';
import './index.scss';
import constants from 'constants/index';
import EditHouseModal from './EditHouse';

function generateDataList(list) {
  return list.map((item, index) => {
    const { host, _id, isHire, type, price, square, title, address } = item;
    return {
      key: index,
      host,
      _id,
      price,
      square,
      title,
      address,
      isHire,
      type,
    };
  });
}

function SeeHouse() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [editModal, setEditModal] = useState({ isShow: false, props: {} });
  const perPage = 20;
  const data = generateDataList(list);

  const columns = [
    {
      title: 'Id chủ nhà',
      key: 'host',
      dataIndex: 'host',
    },
    {
      title: 'Mã nhà',
      dataIndex: '_id',
      key: '_id',
      render: (text) => (
        <a href={constants.ROUTES.HOUSE + '/' + text} target="blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Cho thuê/Bán',
      dataIndex: 'isHire',
      key: 'isHire',
      render: (isHire) => (isHire ? 'Thuê' : 'Bán'),
      filters: [
        {
          text: 'Bán',
          value: false,
        },
        {
          text: 'Thuê',
          value: true,
        },
      ],
      filterMultiple: true,
      onFilter: (value, record) => record.isHire === value,
    },
    {
      title: 'Loại nhà',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        return constants.REAL_ESTATE_TYPES.find((item) => item.type == type)
          .title;
      },
    },
    {
      title: 'Giá',
      key: 'price',
      dataIndex: 'price',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.price - b.price,
      render: (text) => <Tag color="#F2821B">{text}</Tag>,
    },
    {
      title: 'Diện tích',
      key: 'square',
      dataIndex: 'square',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.square - b.square,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text) => (
        <>
          <DeleteOutlined
            onClick={() => onDeleteHouse(text._id)}
            className="icon m-r-8"
            style={{ color: 'red' }}
          />
          <EditOutlined
            onClick={() => onEditHouse(text)}
            className="icon"
            style={{ color: '#444' }}
          />
        </>
      ),
    },
  ];

  // event: Lấy danh sách sản phẩm
  useEffect(() => {
    let isSubscribe = true;
    async function getList() {
      try {
        const list = await adminApi.getAllHouse(page, perPage);
        if (list && isSubscribe) {
          setList(list.data.list);
          setTotal(list.data.count);
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

  // event: xoá sản phẩm
  const onDeleteHouse = async (id) => {
    try {
      const result = await adminApi.deleteHouse(id);
      if (result) {
        message.success('Xoá thành công', 3);
        setList(list.filter((item) => item._id !== id));
      }
    } catch (error) {
      message.success('Xoá thất bại', 3);
    }
  };

  // event: Sửa thông tin sản phẩm
  const onEditHouse = (house) => {
    setEditModal({ isShow: true, props: house });
  };

  // rendering
  return (
    <>
      {editModal.isShow && (
        <EditHouseModal
          house={editModal.props}
          onClose={() => setEditModal({ isShow: false, props: {} })}
        />
      )}
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

export default SeeHouse;
