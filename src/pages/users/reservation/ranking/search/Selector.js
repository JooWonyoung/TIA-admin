import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getChannelApi } from 'api/reservation/get';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFilter } from 'modules/filters/userFilter';
import { addPreUserFilter } from 'modules/filters/preUserFilter';
import { addRankUserFilter } from 'modules/filters/rankUserFilter';

const Selector = ({ options, name }) => {
  const { Option } = Select;
  const [channelList, setChannelList] = useState([]);
  const filters = useSelector((store) => {
    return store.rankUserFilter;
  });
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addRankUserFilter(key, value));
  };

  const handleChange = (value) => {
    if (name === 'ch') {
      addToFilter('ch', value);
    } else {
      addToFilter([name], value);
    }
  };

  const fetchChannelList = async () => {
    await getChannelApi()
      .then(({ data }) => {
        if (data.success) {
          setChannelList(data.list);
        }
      })
      .catch((e) => {});
  };

  useEffect(() => {
    fetchChannelList();
  }, []);

  return (
    <>
      <Select
        value={filters[name]}
        style={{
          width: '100%',
        }}
        onChange={handleChange}
      >
        {name === 'ch'
          ? channelList.map((channel) => {
              return (
                <Option key={channel.id} value={channel.code}>
                  {channel.name}
                </Option>
              );
            })
          : options.map((el, idx) => {
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
