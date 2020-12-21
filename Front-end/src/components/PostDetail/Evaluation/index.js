import {
  Button,
  Col,
  Input,
  message,
  Pagination,
  Progress,
  Rate,
  Row,
} from 'antd';
import commentApi from 'apis/commentApi';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import UserComment from './UserComment';
const { TextArea } = Input;

function EvaluationView(props) {
  const { cmtList, houseId } = props;
  const [cmtListState, setCmtListState] = useState(cmtList);
  const { isAuth } = useSelector((state) => state.authenticate);
  const user = useSelector((state) => state.user);

  const [cmt, setCmt] = useState('');

  // phân trang
  const [page, setPage] = useState(1);
  const pageTotal = Math.ceil(cmtListState.length / constants.COMMENT_PER_PAGE);
  let start = (page - 1) * constants.COMMENT_PER_PAGE;
  const cmtListSliced = cmtListState.slice(
    start,
    start + constants.COMMENT_PER_PAGE,
  );

  useEffect(() => {
    setCmtListState(cmtList);
    return () => {};
  }, [cmtList]);

  // event: comment
  const onComment = async () => {
    try {
      const { avt, fullName } = user;
      const content = cmt.trim();
      if (content === '') {
        message.warning('Hãy nhập nhận xét của bạn');
        return;
      }
      let data = {
        author: { name: fullName, avt },
        houseId,
        time: new Date().getTime(),
        content,
      };

      const response = await commentApi.postComment(data);
      if (response) {
        setCmtListState([...cmtListState, data]);
        setCmt('');
      }
    } catch (error) {
      message.error('Nhận xét thất bại. Thử lại', 3);
    }
  };

  // rendering ...
  return (
    <Row className="Evaluation bg-white p-16 bor-rad-8">
      {/* tiều đề */}
      <Col className="m-b-8" span={24}>
        <h2 className="font-weight-700">Nhận xét của khách hàng</h2>
        <div className="underline-title"></div>
      </Col>

      {/* Xem bình luận, nhận xét */}
      <Col span={24}>
        {cmtListSliced.map((item, index) => (
          <UserComment key={index} comment={item} />
        ))}
        {pageTotal > 1 && (
          <Pagination
            className="t-right m-b-16"
            defaultCurrent={1}
            total={pageTotal}
            pageSize={1}
            onChange={(p) => setPage(p)}
          />
        )}
      </Col>

      {/* bình luận */}
      <Col span={24} className="d-flex">
        {isAuth ? (
          <>
            <TextArea
              maxLength={constants.MAX_LEN_COMMENT}
              autoSize
              showCount
              allowClear
              value={cmt}
              id="commentArea"
              placeholder="Nhập nhận xét của bạn"
              size="large"
              className="flex-grow-1 m-r-16"
              onChange={(e) => setCmt(e.target.value)}
            />
            <Button
              type="primary"
              size="large"
              style={{ flexBasis: 122 }}
              onClick={onComment}>
              Gửi nhận xét
            </Button>
          </>
        ) : (
          <Button type="link" size="large">
            <Link to="/login">Đăng nhập để nhận xét</Link>
          </Button>
        )}
      </Col>
    </Row>
  );
}

EvaluationView.defaultProps = {
  cmtList: [],
};

EvaluationView.propTypes = {
  cmtList: PropTypes.any,
  houseId: PropTypes.string,
};

export default EvaluationView;
