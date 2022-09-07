import React from 'react';
import { Col, Row, Statistic, Typography } from 'antd';
import {
  SendOutlined,
  CheckCircleOutlined,
  ScheduleTwoTone,
} from '@ant-design/icons';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import Graph from './Graph';
import DateList from './DateList';
import useFetch from 'hooks/useFetch';

const Status = () => {
  const { Title } = Typography;
  const [chartData, resultData, fetchData] = useFetch('rsrvstatus', '', '');

  return (
    <>
      <Header>
        <Title level={2}>
          <ScheduleTwoTone twoToneColor='#5C7BD9' /> 사전예약 신청현황
        </Title>
      </Header>
      <Result>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title='Send Mail'
              value={resultData && resultData.all_count}
              prefix={<SendOutlined style={{ margin: '0 5px' }} />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Completed'
              value={resultData.completion_count}
              prefix={<CheckCircleOutlined style={{ margin: '0 5px' }} />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Conversion Ratio'
              value={resultData.completion_per}
              suffix='%'
            />
          </Col>
        </Row>
      </Result>
      <Graph chartData={chartData} />
      <SearchBar fetchData={fetchData} />
      <DateList chartData={chartData} />
    </>
  );
};

export default Status;

const Header = styled.div`
  ${(props) => props.theme.variables.flex()}
  margin: 2rem 0  2rem 0;

  .anticon {
    margin-right: 10px;
  }
  .ant-typography {
    width: 80%;
  }
`;

const Result = styled.div`
  ${(props) => props.theme.variables.flex()}
  margin-bottom: 50px;
  .ant-row {
    ${(props) => props.theme.variables.flex('', 'space-between')}
    width: 80%;
  }
  .ant-col-12 {
    flex: 33%;
    text-align: center;
  }
`;
