import React, { useState, useEffect } from 'react';
import HeaderSection from 'components/header/Header';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import useFetch from 'hooks/useFetch';
import ListTable from 'components/table/ListTable';
import UserDetailModal from './UserDetailModal';
import { useSelector } from 'react-redux';
import Search from 'components/search/Search';
const { Content } = Layout;

const UserInfo = ({ className }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [newBucket, setNewBucket] = useState([]);
  const [onModal, setOnModal] = useState(false);
  const nav = useSelector((store) => {
    return store.nav;
  });

  const [buckets, totalPage, fetchData, loading, setLoading] = useFetch(
    'userinfo',
    currentPage,
    perPage
  );
  const columns = [
    {
      title: 'No',
      width: 40,
      align: 'center',
      fixed: 'left',
      render: (text, record, index) => {
        return <>{(currentPage - 1) * perPage + (index + 1)}</>;
      },
    },
    {
      title: '이메일',
      width: 200,
      dataIndex: 'email',
      key: 'email',
      fixed: 'left',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '닉네임',
      width: 100,
      dataIndex: 'nickname',
      key: 'nickname',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '국가',
      width: 100,
      dataIndex: 'nation',
      key: 'nation',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '권한',
      width: 100,
      dataIndex: 'level',
      key: 'level',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '블루브릭',
      dataIndex: 'blue_point',
      key: 'blue_point',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
    },
    {
      title: '레드브릭',
      dataIndex: 'red_point',
      key: 'red_point',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
    },
    {
      title: 'T-브릭',
      dataIndex: 't_point',
      key: 't_point',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
    },
    {
      title: '최근접속일',
      dataIndex: 'login_at',
      key: 'login_at',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
    },
    {
      title: 'Action',
      key: 'operation',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      fixed: 'right',
      width: 100,
      align: 'center',

      render: () => {
        return (
          <Button type='primary' onClick={() => setOnModal(true)}>
            상세보기
          </Button>
        );
      },
    },
  ];

  const changeBucketForm = () => {
    const Arr = [];
    const levelForm = {
      S: '최고관리자',
      A: '일반관리자',
      M: '일반회원',
    };
    buckets.forEach((user) => {
      const userInfo = user;
      userInfo.key = user.id;
      userInfo.level = levelForm[userInfo.level];
      userInfo.red_point = user.red_point ? user.red_point : 0;
      userInfo.t_point = user.t_point ? user.t_point : 0;
      userInfo.created_at = user.created_at.split('T')[0];
      userInfo.login_at = user.login_at && user.login_at.split('T')[0];
      userInfo.nation = user.nation && user.nation_code['name_ko'];

      Arr.push(userInfo);
    });
    setNewBucket(Arr);
  };

  useEffect(() => {
    changeBucketForm();
    setLoading(false);
  }, [buckets]);

  return (
    <div
      className={className}
      style={{ paddingLeft: `${nav.collapsed ? '80px' : '254px'}` }}
    >
      <Layout
        style={{
          width: '100%',
          backgroundColor: '#F0F2F5',
        }}
      >
        <HeaderSection />
        <Layout
          style={{ margin: '50px', padding: '20px', backgroundColor: 'white' }}
        >
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
              page={'userinfo'}
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
              page={'userinfo'}
            />
            <UserDetailModal onModal={onModal} setOnModal={setOnModal} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const StyledUserInfo = styled(UserInfo)`
  padding-left: 254px;
  background-color: white;
`;

export default StyledUserInfo;

const searchMenus = [
  {
    id: 0,
    title: '권한',
    span: 1,
    name: 'level',
    type: 'select',
    options: [
      {
        option: '전체',
        value: '',
      },
      {
        option: '최고관리자',
        value: 'S',
      },
      {
        option: '일반관리자',
        value: 'A',
      },
      {
        option: '일반회원',
        value: 'M',
      },
    ],
  },
  {
    id: 1,
    span: 1,
    title: '이름',
    name: 'name',
    type: 'input',
  },
  {
    id: 2,
    span: 1,
    title: '닉네임',
    name: 'nickname',
    type: 'input',
  },
  {
    id: 3,
    span: 1,
    title: '이메일',
    name: 'email',
    type: 'input',
  },
  {
    id: 4,
    span: 1,
    title: '전화번호',
    name: 'hp',
    type: 'input',
  },
  {
    id: 5,
    span: 1,
    title: '추천코드',
    name: 'code',
    type: 'input',
  },
  {
    id: 6,
    span: 1,
    title: '국가',
    name: 'nation',
    type: 'nation',
  },
  {
    id: 7,
    span: 1,
    title: '차단여부',
    name: 'blind',
    type: 'select',
    options: [
      {
        option: '전체',
        value: '',
      },
      {
        option: '차단',
        value: '1',
      },
      {
        option: '미차단',
        value: '0',
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
