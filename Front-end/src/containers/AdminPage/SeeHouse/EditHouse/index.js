import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
} from 'antd';
import constants from 'constants/index';
const { Option } = Select;
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import adminApi from 'apis/adminApi';

function EditHouseModal(props) {
  const [visible, setVisible] = useState(true);
  const { house, onClose } = props;
  const { _id, title, type, isHire, price, square } = house;
  const initialValues = { _id, title, type, isHire, price, square };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onUpdateSucceed = () => {
    message.success('Cập nhật thành công', 2);
    setIsSubmitting(false);
    setTimeout(() => {
      location.reload();
    }, 1);
  };

  const onUpdate = async (data) => {
    try {
      setIsSubmitting(true);
      if (JSON.stringify(data) == JSON.stringify(initialValues)) {
        setIsSubmitting(false);
        setVisible(false);
        onClose();
        return;
      }
      const result = await adminApi.updateHouse(data);
      if (result) {
        onUpdateSucceed();
      }
    } catch (error) {
      message.error('Cập nhật thất bại', 2);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      className="edit-modal"
      maskClosable={false}
      title="CẬP NHẬT THÔNG TIN NHÀ/ĐẤT"
      centered
      visible={visible}
      footer={null}
      onOk={() => setVisible(false)}
      onCancel={() => {
        setVisible(false);
        onClose();
      }}
      width={1000}>
      <Form
        name="basic"
        initialValues={initialValues}
        onFinish={onUpdate}
        onFinishFailed={() => message.error('Cập nhật thất bại')}>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Form.Item name="_id">
              <Input size="large" className="w-100" disabled={true} />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Nhập tiêu đề' }]}>
              <Input.TextArea size="large" placeholder="Tiêu đề" autoSize />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item name="type">
              <Select
                className="w-100"
                size="large"
                showArrow
                showSearch
                placeholder="Loại bất động sản"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }>
                {constants.REAL_ESTATE_TYPES.map((item, index) => (
                  <Option key={index} value={item.type}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item name="isHire">
              <Select
                className="w-100"
                size="large"
                showArrow
                placeholder="Thuê hay Bán">
                <Option value={true}>Thuê</Option>
                <Option value={false}>Bán</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item name="price">
              <InputNumber
                min={0}
                max={50000000}
                size="large"
                className="w-100"
                placeholder="Giá (triệu)"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item name="square">
              <InputNumber
                min={0}
                max={10000000}
                size="large"
                className="w-100"
                placeholder="Diện tích (m2)"
              />
            </Form.Item>
          </Col>

          {/* Button */}
          <Col span={12}>
            <Button
              size="large"
              className="w-100"
              onClick={() => {
                setVisible(false);
                onClose();
              }}
              type="default"
              danger>
              Huỷ bỏ
            </Button>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button
                disabled={isSubmitting}
                icon={isSubmitting ? <LoadingOutlined /> : null}
                size="large"
                className="w-100"
                type="primary"
                htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

EditHouseModal.propTypes = {
  house: PropTypes.any,
  onClose: PropTypes.func,
};

export default EditHouseModal;
