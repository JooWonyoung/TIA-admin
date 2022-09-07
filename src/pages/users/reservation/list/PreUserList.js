import React, { useEffect, useState } from 'react';
import ListTable from 'components/table/ListTable';
import { Layout, Tag } from 'antd';
import styled from 'styled-components';
import useFetch from 'hooks/useFetch';
import Search from 'components/search/Search';
const { Content } = Layout;

const PreUserList = ({ className }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [buckets, totalPage, fetchData] = useFetch(
    'preuser',
    currentPage,
    perPage
  );
  const [newBucket, setNewBucket] = useState([]);
  const columns = [
    {
      title: 'No',
      width: 20,
      dataIndex: 'id',
      align: 'center',
      render: (text, record, index) => {
        return <>{(currentPage - 1) * perPage + (index + 1)}</>;
      },
    },
    {
      title: '상태',
      width: 30,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      render: (status) => {
        return (
          <Tag color={status === 'C' ? 'success' : 'warning'}>
            {status === 'C' ? '신청완료' : '인증대기'}
          </Tag>
        );
      },
    },
    {
      title: '이메일',
      width: 90,
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '국가',
      width: 55,
      dataIndex: 'nation',
      key: 'nation',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'IP',
      width: 40,
      dataIndex: 'ip',
      key: 'ip',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '디바이스',
      dataIndex: 'provider',
      key: 'provider',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 30,
    },
    {
      title: '채널',
      dataIndex: 'ch',
      key: 'ch',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 20,
    },
    {
      title: '등록일(한국)',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 35,
    },
    {
      title: '등록일(미국)',
      dataIndex: 'createUTC',
      key: 'createUTC',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 35,
    },
  ];

  const changeBucketForm = () => {
    const Arr = [];
    buckets.forEach((user) => {
      const userInfo = user;
      userInfo.createAt = user.createAt && user.createAt.split(' ')[0];
      userInfo.createUTC = user.createUTC && user.createUTC.split(' ')[0];
      Arr.push(userInfo);
    });
    setNewBucket(Arr);
  };

  useEffect(() => {
    changeBucketForm();
    setLoading(false);
  }, [buckets]);

  return (
    <div className={className}>
      <Content
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Search
          fetchData={fetchData}
          setCurrentPage={setCurrentPage}
          searchMenus={searchMenus}
          column={2}
          page={'preuser'}
        />
        <ListTable
          newBucket={newBucket}
          loading={loading}
          fetchData={fetchData}
          totalPage={totalPage}
          columns={columns}
          perPage={perPage}
          setPerPage={setPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          page={'preuser'}
        />
      </Content>
    </div>
  );
};

const StyledReservList = styled(PreUserList)`
  .total {
    width: 100%;
    padding: 0 0 10px 50px;
    display: flex;
    justify-content: start;
    font-size: 15px;
  }
`;

export default StyledReservList;

const searchMenus = [
  {
    id: 3,
    spna: 1,
    title: '이메일',
    name: 'email',
    type: 'input',
  },
  {
    id: 0,
    spna: 1,
    title: '상태',
    name: 'status',
    type: 'select',
    options: [
      {
        option: '전체',
        value: '',
      },
      {
        option: '신청완료',
        value: 'C',
      },
      {
        option: '인증대기',
        value: 'W',
      },
    ],
  },
  {
    id: 7,
    spna: 1,
    title: '디바이스',
    name: 'provider',
    type: 'select',
    options: [
      {
        option: '전체',
        value: '',
      },
      {
        option: 'Android',
        value: 'Android',
      },
      {
        option: 'IOS',
        value: 'IOS',
      },
    ],
  },
  {
    id: 6,
    spna: 1,
    title: '국가',
    name: 'nation',
    type: 'nation',
  },
  {
    id: 1,
    spna: 1,
    title: '채널',
    name: 'ch',
    type: 'select',
  },
  {
    id: 8,
    spna: 5,
    title: '가입일',
    name1: 'start_at',
    name2: 'end_at',
    type: 'date',
  },
];
