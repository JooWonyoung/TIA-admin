import React from 'react';
import { Button, Col, Descriptions, Input, Row } from 'antd';
import styled from 'styled-components';
import Selector from './Selector';
import CountrySelector from './CountrySelector';
import DateSearch from './DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPreUserFilter,
  initializePreUserFilter,
} from 'modules/filters/preUserFilter';

const Search = ({
  className,
  fetchData,
  setCurrentPage,
  date,
  setDate,
  selectedDays,
  setSelectedDays,
  searchMenus,
  column,
}) => {
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addPreUserFilter(key, value));
  };
  const initailizeFilter = () => {
    dispatch(initializePreUserFilter());
  };

  const filters = useSelector((store) => {
    return store.preUserFilter;
  });

  const Inputs = (input) => {
    switch (input.type) {
      case 'input':
        return (
          <Input
            name={input.name}
            value={filters[input.name]}
            onChange={(e) => {
              addToFilter([e.target.name], e.target.value);
            }}
          />
        );

      case 'select':
        return <Selector options={input.options} name={input.name} />;

      case 'nation':
        return <CountrySelector name={input.name} />;

      case 'date':
        return (
          <DateSearch
            date={date}
            setDate={setDate}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        );

      default:
        return;
    }
  };

  const search = () => {
    fetchData();
    setCurrentPage(1);
  };

  const initailize = () => {
    initailizeFilter();
    setSelectedDays(null);
    setDate({ start: '', end: '' });
  };

  return (
    <div className={className}>
      <Descriptions title='검색조건' bordered size={'small'} column={column}>
        {searchMenus.map((input) => {
          return (
            <Descriptions.Item label={input.title} span={input.span}>
              {Inputs(input)}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
          }}
        >
          <Button type='primary' htmlType='submit' onClick={search}>
            검색
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              initailize();
            }}
          >
            초기화
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const StyledSearch = styled(Search)`
  width: 100%;
  padding: 0 50px 50px 50px;
`;

export default StyledSearch;
