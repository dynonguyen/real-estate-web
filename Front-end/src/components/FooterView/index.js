import BrokerCard from 'components/BrokerCard';
import BrokerList from 'containers/BrokerList';
import React from 'react';

function FooterView() {
  return (
    <div className="container-fluid bg-white ">
      <BrokerList />
    </div>
  );
}

export default FooterView;
