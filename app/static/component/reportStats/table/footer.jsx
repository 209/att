import React, { Component } from 'react';

const isFloat = n => Number(n) === n && n % 1 !== 0;

const Footer = props => {
  const {
    total,
    totalOnPage,
    field,
  } = props;

  const totalOnPageRawValue = totalOnPage[field];
  const totalRawValue = total[field];

  const totalOnPageValue = isFloat(totalOnPageRawValue) ? totalOnPageRawValue.toFixed(2) : totalOnPageRawValue;
  const totalValue = isFloat(totalRawValue) ? totalRawValue.toFixed(2) : totalRawValue;

  return (
    <div className="report-table-footer-cell">
      <div>{totalOnPageValue}</div>
      <div>{totalValue}</div>
    </div>
  );
};

export default Footer;
