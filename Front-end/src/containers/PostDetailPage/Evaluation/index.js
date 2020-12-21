import commentApi from 'apis/commentApi';
import EvaluationView from 'components/PostDetail/Evaluation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Evaluation(props) {
  const { houseId } = props;
  const [cmtList, setCmtList] = useState([]);

  useEffect(() => {
    let isSubscribe = true;
    async function getCommentList() {
      try {
        const response = await commentApi.getCommentList(houseId);
        if (response) {
          if (isSubscribe) setCmtList(response.data);
        }
      } catch (error) {}
    }
    getCommentList();
    return () => (isSubscribe = false);
  }, [props]);

  // rendering...
  return <EvaluationView houseId={houseId} cmtList={cmtList} />;
}

Evaluation.defaultProps = {};
Evaluation.propTypes = {
  houseId: PropTypes.string,
};

export default Evaluation;
