import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Typography, Space } from 'antd';
import DateSearch from './DateSearch';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Selector from './Selector';
import styled from 'styled-components';
import CountrySelector from './CountrySelector';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter } from 'modules/userFilter';
const { Title } = Typography;

const SearchForm = ({ className, fetchData, setCurrentPage }) => {
  const [expand, setExpand] = useState(false);
  const [date, setDate] = useState({ start: '', end: '' });
  const [selectedDays, setSelectedDays] = useState(null);
  const filters = useSelector((store) => {
    return store.userinfo;
  });
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addFilter(key, value));
  };

  const fields = [
    { name: ['level'], value: filters.level },
    { name: ['name'], value: filters.name },
    { name: ['nickname'], value: filters.nickname },
    { name: ['email'], value: filters.email },
    { name: ['hp'], value: filters.hp },
    { name: ['code'], value: filters.code },
  ];

  const getFields = () => {
    const count = expand ? 10 : 4;
    const children = [];

    SEARCH_DATA.slice(0, count).forEach((input) => {
      children.push(
        <Col span={6} key={input.id}>
          <Form.Item name={input.name} label={input.title}>
            {input.type === 'input' ? (
              <Input
                name={input.name}
                onChange={(e) => {
                  addToFilter([e.target.name], e.target.value);
                }}
              />
            ) : input.type === 'select' ? (
              input.name === 'nation' ? (
                <CountrySelector />
              ) : (
                <Selector options={input.options} title={input.name} />
              )
            ) : (
              <DateSearch
                date={date}
                setDate={setDate}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            )}
          </Form.Item>
        </Col>
      );
    });

    return children;
  };

  const initailize = () => {
    addToFilter();
    setSelectedDays(null);
    setDate({ start: '', end: '' });
  };

  const onFinish = () => {
    fetchData();
    setCurrentPage(1);
  };

  return (
    <div className={className}>
      <Form
        name='advanced_search'
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        className='ant-advanced-search-form'
        onFinish={onFinish}
        style={{
          width: '100%',
          margin: '50px',
          padding: '25px 30px',
          backgroundColor: 'white',
        }}
        fields={fields}
      >
        <Title level={5} style={{ marginBottom: '40px' }}>
          ????????????
        </Title>
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type='primary' htmlType='submit'>
              ??????
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                initailize();
              }}
            >
              ?????????
            </Button>
            <a
              style={{
                fontSize: 12,
              }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} ?????????
            </a>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const StyledSearchForm = styled(SearchForm)`
  ${(props) => props.theme.variables.flex()}
  width: 100%;
  height: auto;

  .ant-col-4 {
    min-width: 60px;
  }
`;

export default StyledSearchForm;

const SEARCH_DATA = [
  {
    id: 0,
    title: '??????',
    span: 1,
    name: 'level',
    type: 'select',
    options: [
      {
        option: '??????',
        value: '',
      },
      {
        option: '???????????????',
        value: 'S',
      },
      {
        option: '???????????????',
        value: 'A',
      },
      {
        option: '????????????',
        value: 'M',
      },
    ],
  },
  {
    id: 1,
    span: 1,
    title: '??????',
    name: 'name',
    type: 'input',
  },
  {
    id: 2,
    span: 1,
    title: '?????????',
    name: 'nickname',
    type: 'input',
  },
  {
    id: 3,
    span: 1,
    title: '?????????',
    name: 'email',
    type: 'input',
  },
  {
    id: 4,
    span: 1,
    title: '????????????',
    name: 'hp',
    type: 'input',
  },
  {
    id: 5,
    span: 1,
    title: '????????????',
    name: 'code',
    type: 'input',
  },
  {
    id: 6,
    span: 1,
    title: '??????',
    name: 'nation',
    type: 'nation',
  },
  {
    id: 7,
    span: 1,
    title: '????????????',
    name: 'blind',
    type: 'select',
    options: [
      {
        option: '??????',
        value: '',
      },
      {
        option: '??????',
        value: '1',
      },
      {
        option: '?????????',
        value: '0',
      },
    ],
  },
  {
    id: 8,
    span: 5,
    title: '?????????',
    name1: 'start_at',
    name2: 'end_at',
    type: 'date',
  },
];
