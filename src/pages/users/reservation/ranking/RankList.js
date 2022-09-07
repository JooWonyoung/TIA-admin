import React, { useEffect, useState } from 'react';
import ListTable from 'components/table/ListTable';
import { Layout, Tag } from 'antd';
import useFetch from 'hooks/useFetch';
import Search from 'components/search/Search';
const { Content } = Layout;

const RankList = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [buckets, totalPage, fetchData] = useFetch(
    'rankuser',
    currentPage,
    perPage
  );
  const [newBucket, setNewBucket] = useState([]);
  const columns = [
    {
      title: 'No',
      width: 20,
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
      title: '추천코드',
      width: 30,
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '추천수',
      width: 20,
      dataIndex: 'referral_no',
      key: 'referral_no',
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
      title: 'IP',
      width: 40,
      dataIndex: 'ip',
      key: 'ip',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
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
        column={3}
        page={'rankuser'}
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
        page={'rankuser'}
      />
    </Content>
  );
};

export default RankList;

const searchMenus = [
  {
    id: 3,
    span: 1,
    title: '이메일',
    name: 'email',
    type: 'input',
  },
  {
    id: 2,
    span: 1,
    title: '추천코드',
    name: 'code',
    type: 'input',
  },
  {
    id: 0,
    span: 1,
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
    span: 1,
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
    span: 1,
    title: 'IP',
    name: 'ip',
    type: 'input',
  },
  {
    id: 1,
    span: 1,
    title: '정렬(내림차순)',
    name: 'order',
    type: 'select',
    options: [
      {
        option: '추천수',
        value: 'referral_no',
      },
      {
        option: '등록일',
        value: 'createAt',
      },
    ],
  },
  {
    id: 8,
    span: 5,
    title: '가입일',
    name1: 'start_at',
    name2: 'end_at',
    type: 'date',
  },
];
