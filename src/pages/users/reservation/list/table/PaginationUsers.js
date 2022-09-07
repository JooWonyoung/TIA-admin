import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

const PaginationUsers = ({
  className,
  perPage,
  setPerPage,
  setCurrentPage,
  totalPage,
  currentPage,
}) => {
  const onChange = (currentPage, perPage) => {
    setCurrentPage(currentPage);
    setPerPage(perPage);
  };

  return (
    <div className={className}>
      <Pagination
        total={totalPage}
        defaultPageSize={perPage}
        current={currentPage}
        onChange={onChange}
      />
    </div>
  );
};

const StyledPaginationUsers = styled(PaginationUsers)`
  margin: 30px;
`;

export default StyledPaginationUsers;
