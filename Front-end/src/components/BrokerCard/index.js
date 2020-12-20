import React from 'react';
import PropTypes from 'prop-types';
import { FacebookFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
import './index.scss';
import helpers from 'helpers';

const bgColor = [
  '#00B14D',
  '#0074E4',
  '#F74A27',
  '#F7841B',
  '#A845EC',
  '#57889C',
];

function BrokerCard(props) {
  const { name, phone, email, fb } = props;
  return (
    <div className="broker-card d-flex flex-direction-column p-16 bor-rad-8">
      <div
        className="avt t-center m-0-auto bor-rad-50"
        style={{ backgroundColor: bgColor[Math.round(Math.random() * 5)] }}>
        <span className="trans-center font-size-48px font-weight-500">
          {name[0]}
        </span>
      </div>
      <h2 className="name t-center font-size-18px font-weight-500 m-t-8">
        <b>{helpers.reduceName(name, 50)}</b>
      </h2>
      <div className="flex-grow-1 m-t-16 contact">
        <div className="d-flex">
          <PhoneFilled rotate={90} className="m-r-8 m-b-8" />
          <span>{phone}</span>
        </div>
        <div className="d-flex">
          <MailFilled className="m-r-8 m-b-8" />
          <span>{helpers.reduceName(email, 50)}</span>
        </div>
        <div>
          <FacebookFilled className="m-r-8" />
          <span>
            <a style={{ wordBreak: 'break-all' }} href={fb}>
              {helpers.reduceName(fb, 50)}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

BrokerCard.defaultProps = {
  email: 'Đang cập nhật',
  fb: 'Đang cập nhật',
  phone: 'Đang cập nhật',
  name: 'Đang cập nhật',
};

BrokerCard.propTypes = {
  email: PropTypes.string,
  fb: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default BrokerCard;
