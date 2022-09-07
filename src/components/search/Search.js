import React from 'react';
import { Button, Col, Descriptions, Input, Row } from 'antd';
import styled from 'styled-components';
import Selector from './Selector';
import CountrySelector from './CountrySelector';
import DateSearch from './DateSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserFilter,
  initializeUserFilter,
} from 'modules/filters/userFilter';
import {
  addPreUserFilter,
  initializePreUserFilter,
} from 'modules/filters/preUserFilter';
import {
  addRankUserFilter,
  initializeRankUserFilter,
} from 'modules/filters/rankUserFilter';

const Search = ({
  className,
  fetchData,
  setCurrentPage,
  searchMenus,
  column,
  page,
}) => {
  const dispatch = useDispatch();
  const addToFilter = (key, value, page) => {
    switch (page) {
      case 'userinfo':
        dispatch(addUserFilter(key, value));
        break;

      case 'preuser':
        dispatch(addPreUserFilter(key, value));
        break;

      case 'rankuser':
        dispatch(addRankUserFilter(key, value));
        break;

      default:
        break;
    }
  };
  const initailizeFilter = (page) => {
    switch (page) {
      case 'userinfo':
        dispatch(initializeUserFilter());
        break;

      case 'preuser':
        dispatch(initializePreUserFilter());
        break;

      case 'rankuser':
        dispatch(initializeRankUserFilter());
        break;

      default:
        break;
    }
  };

  const filters = useSelector((store) => {
    switch (page) {
      case 'userinfo':
        return store.userFilter;

      case 'preuser':
        return store.preUserFilter;

      case 'rankuser':
        return store.rankUserFilter;

      default:
        return;
    }
  });

  const Inputs = (input) => {
    switch (input.type) {
      case 'input':
        return (
          <Input
            name={input.name}
            value={filters[input.name]}
            onChange={(e) => {
              addToFilter([e.target.name], e.target.value, page);
            }}
          />
        );

      case 'select':
        return (
          <Selector options={input.options} name={input.name} page={page} />
        );

      case 'nation':
        return <CountrySelector name={input.name} page={page} />;

      case 'date':
        return <DateSearch page={page} />;

      default:
        return;
    }
  };

  const search = () => {
    fetchData();
    setCurrentPage(1);
  };

  const initailize = () => {
    initailizeFilter(page);
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
