import React from 'react';
import { Select } from 'antd';
import useFetch from 'hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { addRankUserFilter } from 'modules/filters/rankUserFilter';

function CountrySelector({ name }) {
  const { Option } = Select;

  const [nationList] = useFetch('nation');
  const filters = useSelector((store) => {
    return store.rankUserFilter;
  });
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addRankUserFilter(key, value));
  };

  const changeHandler = (value) => {
    addToFilter([name], value);
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
