import React from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter } from 'modules/userFilter';

const Selector = ({ options, title }) => {
  const { Option } = Select;
  const filters = useSelector((store) => {
    return store.userinfo;
  });
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addFilter(key, value));
  };

  return (
    <>
      <Select
        value={filters[title]}
        style={{
          width: '100%',
        }}
        onChange={(e) => {
          addToFilter([title], e);
        }}
      >
        {options.map((el, idx) => {
          return (
            <Option key={idx} value={el.value}>
              {el.option}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default Selector;
