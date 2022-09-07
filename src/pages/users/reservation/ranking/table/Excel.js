import React, { useCallback, useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getUsersApi } from 'api/user/get';
import { useSelector } from 'react-redux';

const Excel = () => {
  const [excelData, setExcelData] = useState([]);
  const filters = useSelector((store) => {
    return store.rankUserFilter;
  });

  const openNotification = () => {
    const args = {
      message: '가입일 설정 요청',
      description: '가입 시작일과 종료일을 설정해주세요!',
    };
    notification.open(args);
  };

  const fetchExcelData = useCallback(async () => {
    const payload = {
      level: '',
      name: '',
      nickname: '',
      email: '',
      hp: '',
      code: '',
      nation: '',
      start_at: filters.start_at,
      end_at: filters.end_at,
      blind: '',
    };

    await getUsersApi(payload)
      .then(({ data }) => {
        if (data.success) {
          setExcelData(data.data);
        }
      })
      .catch((e) => {});
  }, [filters.start_at, filters.end_at]);

  const createExcel = () => {
    if (filters.start_at && filters.end_at) {
      const xlsx = require('xlsx');
      const book = xlsx.utils.book_new();
      const users = xlsx.utils.json_to_sheet(excelData);
      xlsx.utils.book_append_sheet(book, users, 'USERS');
      xlsx.writeFile(book, `users_${filters.start_at}~${filters.end_at}.xlsx`);
    } else {
      openNotification();
    }
  };

  useEffect(() => {
    fetchExcelData();
  }, [fetchExcelData]);

  return (
    <>
      <Button type='primary' icon={<DownloadOutlined />} onClick={createExcel}>
        엑셀다운로드
      </Button>
    </>
  );
};

export default Excel;
