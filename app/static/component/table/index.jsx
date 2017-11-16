import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {
  componentDidMount() {
    const {
      fetchPockemones,
    } = this.props;

    fetchPockemones();
  }

  // renderTable() {
  //   return (
  //     <div className="ptr-table">
  //       {loadedController && <ReactTable
  //         LoadingComponent={LoadingComponent}
  //         PaginationComponent={PaginationComponent}
  //         NoDataComponent={NoDataComponent} const Table=() => {
  //         return (
  //         <div className="ptr-table">
  //         {loadedController && <ReactTable
  //           LoadingComponent={LoadingComponent}
  //           PaginationComponent={PaginationComponent}
  //           NoDataComponent={NoDataComponent}
  //           getNoDataProps={props => ({
  //             loading: props.loading,
  //             isEmpty: !props.data.length,
  //           })}
  //           onPageChange={page => changePage(page)}
  //           onPageSizeChange={(pageSize, page) => changePagination({
  //             pages,
  //             pageSize,
  //           })}
  //           sortable={false}
  //           resizable={false}
  //           showPagination={true}
  //           loading={isFetching}
  //           collapseOnPageChange={true}
  //           manual={true}
  //           pageSizeOptions={[10, 20, 50, 100]}
  //           defaultPageSize={10}
  //           pages={pages}
  //           page={page - 1}
  //           defaulPage={page - 1}
  //           minRows={1}
  //           data={isFetching ? [] : table}
  //           columns={columns}
  //           onFetchData={onFetchData}
  //         />}
  //         </div>
  //         )
  //       };
  //         getNoDataProps={props => ({
  //         loading: props.loading,
  //         isEmpty: !props.data.length,
  //       })}
  //         onPageChange={page => changePage(page)}
  //         onPageSizeChange={(pageSize, page) => changePagination({
  //         pages,
  //         pageSize,
  //       })}
  //         sortable={false}
  //         resizable={false}
  //         showPagination={true}
  //         loading={isFetching}
  //         collapseOnPageChange={true}
  //         manual={true}
  //         pageSizeOptions={[10, 20, 50, 100]}
  //         defaultPageSize={10}
  //         pages={pages}
  //         page={page - 1}
  //         defaulPage={page - 1}
  //         minRows={1}
  //         data={isFetching ? [] : table}
  //         columns={columns}
  //         onFetchData={onFetchData}
  //         />}
  //     </div>
  //   );
  // }

  render() {
    const {
      pockemones,
    } = this.props;

    return (
      <div className="ptr-table">
        {pockemones.join(',')}
      </div>
    );
  }
}

export default Table;
