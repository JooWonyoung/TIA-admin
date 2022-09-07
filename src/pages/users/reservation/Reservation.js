import { Tabs, Layout } from 'antd';
import React, { useState } from 'react';
import HeaderSection from 'components/header/Header';
import styled from 'styled-components';
import Status from './status/Status';
import PreUserList from './list/PreUserList';
import RankList from './ranking/RankList';
import { useDispatch, useSelector } from 'react-redux';
import { moveTap } from 'modules/taps';
const { TabPane } = Tabs;
const { Content } = Layout;

const Reservation = ({ className }) => {
  const taps = useSelector((store) => {
    return store.taps;
  });
  const nav = useSelector((store) => {
    return store.nav;
  });
  const dispatch = useDispatch();
  const onChange = (key) => {
    dispatch(moveTap(key));
  };

  return (
    <div
      className={className}
      style={{ paddingLeft: `${nav.collapsed ? '80px' : '254px'}` }}
    >
      <Layout
        style={{
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Layout
          style={{
            width: '100%',
          }}
        >
          <HeaderSection />
          <Content
            style={{
              width: '100%',
              height: 'auto',
              backgroundColor: '#F0F2F5',
            }}
          >
            <Tabs
              activeKey={taps}
              onChange={onChange}
              style={{
                margin: '50px',
                padding: '25px',
                backgroundColor: 'white',
                height: 'auto',
              }}
            >
              <TabPane tab='신청현황' key='status'>
                <Status />
              </TabPane>
              <TabPane tab='신청리스트' key='preuser'>
                <PreUserList />
              </TabPane>
              <TabPane tab='랭킹리스트' key='rankuser'>
                <RankList />
              </TabPane>
              <TabPane tab='채널' key='channel'>
                Content of Tab Pane 4
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const StyledReservation = styled(Reservation)`
  padding-left: 254px;
`;

export default StyledReservation;
