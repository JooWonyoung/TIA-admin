import React from 'react';
import { DatePicker, Radio } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import moment from 'moment';
import 'moment/locale/ko';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFilter } from 'modules/filters/userFilter';
import { addPreUserFilter } from 'modules/filters/preUserFilter';
import { addRankUserFilter } from 'modules/filters/rankUserFilter';

const DateSearch = ({ page }) => {
  const { RangePicker } = DatePicker;
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

  const changeDateForm = (target) => {
    return `${target._d.getFullYear()}-${
      '0' + (target._d.getMonth() + 1)
    }-${target._d.getDate()}`;
  };

  return (
    <>
      <RangePicker
        locale={locale}
        value={[filters.start, filters.end]}
        style={{ width: '26.5%' }}
        onChange={(e) => {
          addToFilter('start_at', changeDateForm(e[0]), page);
          addToFilter('end_at', changeDateForm(e[1]), page);
        }}
      />
      <Radio.Group
        style={{ marginLeft: '20px' }}
        value={filters.selectedDays}
        onChange={(e) => {
          const howManyDays = e.target.value;
          addToFilter(
            'start_at',
            moment().day(-howManyDays).format('YYYY-MM-DD'),
            page
          );
          addToFilter('end_at', moment().format('YYYY-MM-DD'), page);
          addToFilter('start', moment().day(-howManyDays), page);
          addToFilter('end', moment(), page);
          addToFilter('selectedDays', howManyDays, page);
        }}
      >
        <Radio style={{ color: '#7E8299' }} value={7}>
          7일
        </Radio>
        <Radio style={{ color: '#7E8299' }} value={30}>
          30일
        </Radio>
        <Radio style={{ color: '#7E8299' }} value={90}>
          90일
        </Radio>
      </Radio.Group>
    </>
  );
};

export default DateSearch;
