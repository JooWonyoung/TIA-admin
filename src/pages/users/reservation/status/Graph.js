import React, { useState, useEffect } from 'react';
import ECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';

const Graph = ({ chartData }) => {
  const filters = useSelector((store) => {
    return store.preReservFilter;
  });

  const [options, setOptions] = useState({
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    tooltip: { trigger: 'axis' },
    series: [
      {
        type: 'line',
      },
    ],
  });

  const addDataInChart = () => {
    const dataIsFiiled = Object.keys(chartData).length;
    const users = dataIsFiiled ? chartData.daily_user_count : [];
    const usersByChannel = dataIsFiiled
      ? chartData.daily_channel_user_count
      : [];
    const channels = filters.channels;
    const xAxisData = [];
    const seriesData = [];

    if (channels.length) {
      users.forEach((data) => {
        xAxisData.push(data.date);
      });
      channels.split(',').forEach((channel) => {
        const dataByChannel = [];
        usersByChannel[channel].forEach((data) => {
          dataByChannel.push(data.completed);
        });
        seriesData.push({
          name: channel,
          type: 'line',
          data: dataByChannel,
        });
      });
      setOptions({
        ...options,
        xAxis: { data: xAxisData },
        legend: { data: channels.split(',') },
        series: seriesData,
      });
    } else {
      users.forEach((data) => {
        xAxisData.push(data.date);
        seriesData.push(data.completed);
      });
      setOptions({
        ...options,
        xAxis: { data: xAxisData },
        legend: { data: channels.split(',') },
        series: [
          {
            data: seriesData,
            type: 'line',
          },
        ],
      });
    }
  };

  useEffect(() => {
    addDataInChart();
  }, [chartData]);

  return (
    <>
      <ECharts
        option={options}
        style={{ width: 'auto', height: '500px' }}
        opts={{ renderer: 'svg' }}
        notMerge={true}
      />
    </>
  );
};

export default Graph;
