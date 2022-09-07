import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

const DateList = ({ className, chartData }) => {
  const [total, setTotal] = useState([]);
  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      width: 200,
      align: 'center',
    },
    {
      title: '신청',
      dataIndex: 'count',
      width: 100,
      align: 'center',
    },
    {
      title: '완료',
      dataIndex: 'completed',
      width: 100,
      align: 'center',
    },
    {
      title: '대기',
      dataIndex: 'waiting',
      width: 100,
      align: 'center',
    },
    {
      title: '전환율',
      dataIndex: 'ratio',
      width: 150,
      align: 'center',
      render: (text) => {
        return <>{text}%</>;
      },
    },
  ];

  const calculateTotal = () => {
    const dataIsFiiled = Object.keys(chartData).length;
    const data = dataIsFiiled ? chartData.daily_user_count : [];
    const total = {
      count: 0,
      completed: 0,
      waiting: 0,
    };
    data.forEach((data) => {
      total.count = total.count + data.count;
      total.completed = total.completed + data.completed;
      total.waiting = total.waiting + data.waiting;
    });
    setTotal({
      date: '합계',
      count: total.count,
      completed: total.completed,
      waiting: total.waiting,
      ratio: Math.round((total.completed / total.count) * 100 * 100) / 100,
    });
  };

  useEffect(() => {
    calculateTotal();
  }, [chartData]);

  return (
    <div className={className}>
      <Table
        size={'small'}
        columns={columns}
        dataSource={chartData.daily_user_count}
        pagination={false}
        scroll={{
          y: 270,
        }}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row style={{ fontWeight: '700' }}>
              <Table.Summary.Cell index={0} colSpan={1} align={'center'}>
                {total.date}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={1} align={'center'}>
                {total.count}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} colSpan={1} align={'center'}>
                {total.completed}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={1} align={'center'}>
                {total.waiting}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={1} align={'center'}>
                {total.ratio}%
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </div>
  );
};

const StyledDateList = styled(DateList)`
  ${(props) => props.theme.variables.flex()}
  margin-top: 50px;
`;

export default StyledDateList;
