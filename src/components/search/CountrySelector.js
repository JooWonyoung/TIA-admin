import React from 'react';
import { Select } from 'antd';
import useFetch from 'hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFilter } from 'modules/filters/userFilter';
import { addPreUserFilter } from 'modules/filters/preUserFilter';
import { addRankUserFilter } from 'modules/filters/rankUserFilter';

function CountrySelector({ name, page }) {
  const { Option } = Select;
  const [nationList] = useFetch('nation');
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

  const changeHandler = (value) => {
    addToFilter([name], value, page);
  };

  return (
    <Select
      value={filters[name]}
      onChange={changeHandler}
      style={{ width: '100%' }}
    >
      {nationList.map((nation, idx) => {
        return (
          <Option key={idx} value={nation.nation}>
            {nation.nation}
          </Option>
        );
      })}
    </Select>
  );
}

export default CountrySelector;
