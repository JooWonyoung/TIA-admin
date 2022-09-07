import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getChannelApi } from 'api/reservation/get';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFilter } from 'modules/filters/userFilter';
import { addPreUserFilter } from 'modules/filters/preUserFilter';
import { addRankUserFilter } from 'modules/filters/rankUserFilter';

const Selector = ({ options, name, page }) => {
  const { Option } = Select;
  const [channelList, setChannelList] = useState([]);
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

  const handleChange = (value) => {
    if (name === 'ch') {
      addToFilter('ch', value, page);
    } else {
      addToFilter([name], value, page);
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
