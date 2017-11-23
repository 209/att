import React from 'react';

import './style.scss';

const TotalInfo = props => {
  const {
    begin,
    end,
    total,
  } = props;
  return (
    <span className="report-info">
      <span>{`Showing ${begin} to ${end} of ${total}`}</span>
    </span>
  );
};

export default TotalInfo;
