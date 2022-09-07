import { Layout, Empty } from 'antd';
import HeaderSection from 'components/header/Header';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
const { Content } = Layout;

const DashBoard = ({ className }) => {
  const nav = useSelector((store) => store.nav);

  return (
    <div
      className={className}
      style={{ paddingLeft: `${nav ? '80px' : '254px'}` }}
    >
      <Layout
        style={{
          flexDirection: 'row',
        }}
      >
        <Layout>
          <HeaderSection />
          <StyledContent>
            <Empty />
          </StyledContent>
        </Layout>
      </Layout>
    </div>
  );
};

const StyledDashBoard = styled(DashBoard)`
  width: 100%;
  padding-left: 254px;
`;

export default StyledDashBoard;

const StyledContent = styled(Content)`
  position: absolute;
  top: 40%;
  left: 50%;
`;
