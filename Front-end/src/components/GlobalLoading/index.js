import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function GlobalLoading(props) {
  return (
    <div style={{ height: '100vh' }}>
      <Spin
        size="large"
        className="Global-Loading trans-center"
        tip={props.content}
      />
    </div>
  );
}

GlobalLoading.defaultProps = {
  content: 'Loading...',
};

GlobalLoading.propTypes = {
  content: PropTypes.string,
};

export default GlobalLoading;
