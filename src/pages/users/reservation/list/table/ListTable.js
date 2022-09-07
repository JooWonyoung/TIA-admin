import { Table, Spin } from 'antd';
import React from 'react';
import PaginationUsers from './PaginationUsers';
import { SearchOutlined } from '@ant-design/icons';
import Excel from './Excel';
import { Space, Typography } from 'antd';
import styled from 'styled-components';
const { Text } = Typography;

const ListTable = ({
  loading,
  fetchData,
  totalPage,
  columns,
  perPage,
  setPerPage,
  currentPage,
  setCurrentPage,
  newBucket,
}) => {
  const sortData = (target) => {
    const orderType = target.columnKey;
    const sortType = target.order.slice(0, -3);
    fetchData(orderType, sortType);
  };

  return (
    <>
      <ExcelContainer>
        <Space size={20} direction='vertical'>
          <Excel />
          <Text type='secondary'>
            <SearchOutlined style={{ opacity: '0.5' }} />
            {`검색결과 ${totalPage}명`}
          </Text>
        </Space>
      </ExcelContainer>
      <Table
        size={'small'}
        columns={columns}
        dataSource={newBucket}
        style={{ padding: '0 50px', width: '100%' }}
        scroll={{
          x: 1000,
        }}
        summary={() => <Table.Summary fixed={'top'} />}
        sticky
        pagination={false}
        loading={loading ? { indicator: <Spin /> } : false}
        onChange={(rowkeys, rows, info) => {
          sortData(info);
        }}
      />
      <PaginationUsers
        perPage={perPage}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ListTable;

const ExcelContainer = styled.div`
  width: 100%;
  padding: 0 0 10px 50px;
  display: flex;
  justify-content: start;
  font-size: 15px;
`;
