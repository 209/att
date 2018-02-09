import React, { Component } from 'react';
import Footer from 'containter/reportStats/table/footer';

export default [{
  Header:   'Date',
  accessor: 'date',
  minWidth: 130,
  Footer:   () => {
    return (
      <div className="report-table-footer-cell">
        <div>TOTAL ON PAGE</div>
        <div>TOTAL</div>
      </div>
    );
  },
}, {
  Header:   'Searches',
  accessor: 'searches',
  minWidth: 70,
  Footer:   <Footer field="searches" />,
}, {
  Header:   'Clicks',
  accessor: 'clicks',
  minWidth: 50,
  Footer:   <Footer field="clicks" />,
}, {
  Header:   'Uniq. clicks',
  accessor: 'unique_clicks',
  minWidth: 90,
  Footer:   <Footer field="unique_clicks" />,
}, {
  Header:   'CTR',
  accessor: 'ctr',
  minWidth: 50,
  Footer:   <Footer field="ctr" />,
}, {
  Header:   'Bookings',
  accessor: 'bookings',
  minWidth: 70,
  Footer:   <Footer field="bookings" />,
}, {
  Header:   'Sales',
  accessor: 'sales',
  minWidth: 50,
  Footer:   <Footer field="sales" />,
}, {
  Header:   'BTR',
  accessor: 'btr',
  minWidth: 50,
  Footer:   <Footer field="btr" />,
}, {
  Header:   'STR',
  accessor: 'str',
  minWidth: 50,
  Footer:   <Footer field="str" />,
}, {
  Header:   'Success %',
  accessor: 'success',
  minWidth: 75,
  Footer:   <Footer field="success" />,
}, {
  Header:   'Errors %',
  accessor: 'errors',
  minWidth: 70,
  Footer:   <Footer field="errors" />,
}, {
  Header:   'Zeros %',
  accessor: 'zeros',
  minWidth: 70,
  Footer:   <Footer field="zeros" />,
}, {
  Header:   'T/O %',
  accessor: 'timeouts',
  minWidth: 50,
  Footer:   <Footer field="timeouts" />,
}, {
  Header:   'Avg Resp',
  accessor: 'duration',
  minWidth: 70,
  Footer:   <Footer field="duration" />,
}];
