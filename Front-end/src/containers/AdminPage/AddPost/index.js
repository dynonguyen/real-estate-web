import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';
import addressApi from 'apis/addressApi';
import adminApi from 'apis/adminApi';
import constants from 'constants/index';
import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
const { Option } = Select;

function AddPost() {
  const [form] = Form.useForm();
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [streetList, setStreetList] = useState([]);
  const [accountList, setAccountList] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const provinceId = useRef(null);

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

  // fn: lấy danh sách tài khoản
  useEffect(() => {
    // dùng để cleanup effect
    let isSubscribe = true;

    async function getAccountList() {
      try {
        const response = await adminApi.getAccountList();
        if (response) {
          if (isSubscribe) setAccountList(response.data);
        }
      } catch (error) {}
    }
    getAccountList();
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

  // fn: lấy danh sách huyện/xã khi đã chọn tỉnh/thành
  const getWardStreetList = async (provinceId = 0, districtId) => {
    try {
      const response = await addressApi.getWardStreetList(
        provinceId,
        districtId,
      );
      if (response) {
        setStreetList(response.data.streets);
        setWardList(response.data.wards);
      }
    } catch (error) {
      throw error;
    }
  };

  // event: Reset form
  const onReset = () => {
    form.resetFields();
  };

  // event: Thêm bài đăng
  const onAddPost = async (value) => {
    try {
      setIsPosting(true);
      const {
        host,
        avt,
        title,
        isHire,
        type,
        price,
        square,
        province,
        wards,
        street,
        addDetails,
        code,
        content,
        start,
        end,
        details,
        catalogs,
      } = value;

      const house = {
        host,
        avt,
        title,
        isHire,
        type,
        price,
        square,
        address: { province, wards, street, details: addDetails },
      };

      const post = {
        code,
        start: new Date(start).getTime(),
        end: new Date(end).getTime(),
        catalogs,
        content: content ? content : '',
        details: details ? details : [],
      };

      const result = await adminApi.postAddHouse(house, post);
      if (result) {
        message.success('Thêm bài đăng thành công');
        setIsPosting(false);
      }
    } catch (error) {
      setIsPosting(false);
      if (error.response) {
        message.error(error.response.data.message);
      } else {
        message.error('Thêm thất bại, thử lại');
      }
    }
  };

  return (
    <Form
      className="p-32 add-post-form"
      form={form}
      name="form"
      onFinish={onAddPost}>
      <Row gutter={[16, 32]}>
        {/* Mã bài đăng */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="code" rules={[{ required: true }]}>
            <Input size="large" placeholder="Mã bài đăng" />
          </Form.Item>
        </Col>
        {/* chủ bài đăng */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="host" rules={[{ required: true }]}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              placeholder="Chủ bài đăng"
              size="large">
              {accountList.map((item, index) => (
                <Option value={item._id} key={index}>
                  {item.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* Ngày đăng */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="start" rules={[{ required: true }]}>
            <DatePicker
              placeholder="Ngày đăng"
              className="w-100"
              size="large"
            />
          </Form.Item>
        </Col>
        {/* Ngày kết thúc */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="end" rules={[{ required: true }]}>
            <DatePicker
              placeholder="Ngày kết thúc"
              className="w-100"
              size="large"
            />
          </Form.Item>
        </Col>
        {/* Nội dung */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="content">
            <Input.TextArea
              placeholder="Nội dung bài viết"
              size="large"
              rows={1}
              maxLength={2000}
              allowClear
              showCount
            />
          </Form.Item>
        </Col>
        {/* catalogs */}
        <Form.List
          name="catalogs"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('Ít nhất 1 bức ảnh'));
                }
              },
            },
          ]}>
          {(fields, { add, remove }, { errors }) => (
            <>
              {/* Field thêm ảnh */}
              {fields.map((field, index) => (
                <Col span={24} sm={12} md={8} lg={6} xl={4} key={index}>
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Nhập link ảnh hoặc xoá nó đi',
                        },
                      ]}
                      noStyle>
                      <Input
                        size="large"
                        placeholder="Link hình ảnh sản phẩm"
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    ) : null}
                  </Form.Item>
                </Col>
              ))}
              {/* Button thêm ảnh */}
              <Col span={24} sm={12} md={8} lg={6} xl={4}>
                <Form.Item>
                  <Button
                    type="dashed"
                    size="large"
                    className="w-100"
                    onClick={() => add()}
                    icon={<PlusOutlined />}>
                    Thêm ảnh
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Col>
            </>
          )}
        </Form.List>
        {/* details */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.List name="details">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="center">
                    <Form.Item
                      {...field}
                      name={[field.name, 'key']}
                      fieldKey={[field.fieldKey, 'key']}
                      rules={[{ required: true, message: 'vd: Hướng nhà' }]}>
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'value']}
                      fieldKey={[field.fieldKey, 'value']}
                      rules={[{ required: true, message: 'vd: Đông-Nam' }]}>
                      <Input placeholder="Value" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    size="large"
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Thêm chi tiết
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
        {/* Avatar */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="avt" rules={[{ required: true }]}>
            <Input size="large" placeholder="Link Avatar" />
          </Form.Item>
        </Col>
        {/* title */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input size="large" placeholder="Tiêu đề của nhà" maxLength={500} />
          </Form.Item>
        </Col>
        {/* price */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="price" rules={[{ required: true }]}>
            <InputNumber
              className="w-100"
              size="large"
              placeholder="Giá (triệu)"
              min={0}
              max={500000}
            />
          </Form.Item>
        </Col>
        {/* square */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="square" rules={[{ required: true }]}>
            <InputNumber
              className="w-100"
              size="large"
              placeholder="Diện tích (m2)"
              min={0}
              max={10000000}
            />
          </Form.Item>
        </Col>
        {/* isHire */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="isHire" rules={[{ required: true }]}>
            <Select placeholder="Cho thuê/bán" size="large">
              <Option value={true}>Thuê</Option>
              <Option value={false}>Bán</Option>
            </Select>
          </Form.Item>
        </Col>
        {/* type */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="type" rules={[{ required: true }]}>
            <Select placeholder="Loại bất động sản" size="large">
              {constants.REAL_ESTATE_TYPES.map((item, index) => (
                <Option value={item.type} key={index}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* province */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="province" rules={[{ required: true }]}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              onChange={(value) => {
                getDistrictList(value);
                provinceId.current = value;
              }}
              placeholder="Tỉnh/thành"
              size="large">
              {provinceList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* district */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="district" rules={[{ required: true }]}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              onChange={(value) => getWardStreetList(provinceId.current, value)}
              placeholder="Huyện/Quận"
              size="large">
              {districtList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* wards */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="wards" rules={[{ required: true }]}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              placeholder="Phường/Xã"
              size="large">
              {wardList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.prefix + ' ' + item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* street */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="street" rules={[{ required: true }]}>
            <Select
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              showSearch
              placeholder="Đường"
              size="large">
              {streetList.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.prefix + ' ' + item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* address details */}
        <Col span={24} sm={12} md={8} lg={6} xl={4}>
          <Form.Item name="addDetails" rules={[{ required: true }]}>
            <Input placeholder="Số nhà cụ thể" size="large" />
          </Form.Item>
        </Col>

        {/* Button Actions */}
        <Col span={24} className="t-right">
          <Form.Item>
            <Button
              className="m-r-8"
              danger
              size="large"
              htmlType="button"
              onClick={onReset}>
              Reset Form
            </Button>
            <Button
              disabled={isPosting}
              size="large"
              type="primary"
              htmlType="submit">
              Thêm bài đăng
              {isPosting && <Spin />}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default AddPost;
