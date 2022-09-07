import React from 'react';
import { DatePicker, Radio } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import moment from 'moment';
import 'moment/locale/ko';
import { useDispatch } from 'react-redux';
import { addFilter } from 'modules/userFilter';

const DateSearch = ({ date, setDate, selectedDays, setSelectedDays }) => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const addToFilter = (key, value) => {
    dispatch(addFilter(key, value));
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
        value={[date.start, date.end]}
        style={{ width: '100%' }}
        onChange={(e) => {
          setDate({ start: e[0], end: e[1] });
          addToFilter('start_at', changeDateForm(e[0]));
          addToFilter('end_at', changeDateForm(e[1]));
          // setFilters({
          //   ...filters,
          //   start_at: changeDateForm(e[0]),
          //   end_at: changeDateForm(e[1]),
          // });
        }}
      />
      <Radio.Group
        value={selectedDays}
        onChange={(e) => {
          const howManyDays = e.target.value;
          setSelectedDays(howManyDays);
          setDate({
            start: moment().day(-howManyDays),
            end: moment(),
          });
          addToFilter(
            'start_at',
            moment().day(-howManyDays).format('YYYY-MM-DD')
          );
          addToFilter('end_at', moment().format('YYYY-MM-DD'));
          // setFilters({
          //   ...filters,
          //   start_at: moment().day(-howManyDays).format('YYYY-MM-DD'),
          //   end_at: moment().format('YYYY-MM-DD'),
          // });
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
