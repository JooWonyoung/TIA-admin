import { Form, Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import ChannelSearch from './ChannelSearch';
import DateSearch from './DateSearch';

const SearchBar = ({ className, fetchData }) => {
  const handleSubmit = () => {
    fetchData();
  };

  return (
    <div className={className}>
      <Form
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 10,
        }}
      >
        <Form.Item label='시작/종료일'>
          <DateSearch />
        </Form.Item>
        <Form.Item label='채널' style={{}}>
          <ChannelSearch />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 5,
          }}
        >
          <Button type='primary' htmlType='submit' onClick={handleSubmit}>
            검색
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const StyledSearchBar = styled(SearchBar)`
  display: flex;
  justify-content: center;

  .ant-form {
    margin-top: 50px;
    width: 70%;
  }

  .ant-form-item {
    width: 100%;
  }

  .ant-row {
    justify-content: center;
  }
`;

export default StyledSearchBar;
