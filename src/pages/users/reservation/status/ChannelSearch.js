import React from 'react';
import { Select } from 'antd';
import useFetch from 'hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addPreReservFilter } from 'modules/filters/preReservFilter';

const ChannelSearch = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const addToFilter = (key, value, page) => {
    dispatch(addPreReservFilter(key, value));
  };
  const [channelList] = useFetch('channel');

  const handleChange = (valueArr) => {
    const values = valueArr.join(',');
    addToFilter('channels', values);
  };

  return (
    <>
      <Select
        mode='multiple'
        allowClear
        style={{ width: '100%' }}
        placeholder='Please select'
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {channelList.map((channel) => {
          return (
            <Option key={channel.id} value={channel.code}>
              {channel.name}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default ChannelSearch;
