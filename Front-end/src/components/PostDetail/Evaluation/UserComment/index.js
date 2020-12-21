import { Avatar, Button, Comment } from 'antd';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import defaultAvt from 'assets/imgs/default-avt.png';

function UserComment(props) {
  const { comment } = props;
  const { author, time, content } = comment;
  const { name, avt } = author;
  const isReduceCmt = content.length >= 200 ? true : false;
  const [isMore, setIsMore] = useState(false);

  // rendering ...
  return (
    <>
      {/* Comment */}
      <Comment
        author={<b className="font-size-14px">{name}</b>}
        avatar={<Avatar src={avt !== '' ? avt : defaultAvt} alt={name} />}
        content={
          <>
            <p className="t-justify">
              {isMore ? content : content.slice(0, 200)}
              {isReduceCmt && (
                <Button type="link" onClick={() => setIsMore(!isMore)}>
                  {isMore ? 'Thu gọn' : 'Xem thêm'}
                </Button>
              )}
            </p>
          </>
        }
        datetime={<span>{helpers.formatTime(time)}</span>}
      />
    </>
  );
}

UserComment.propTypes = {
  comment: PropTypes.object,
};

export default UserComment;
