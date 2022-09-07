import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
const { Header } = Layout;

const HeaderSection = ({ className }) => {
  return (
    <>
      <Header
        className={className}
        style={{
          backgroundColor: 'white',
        }}
      >
        Header
      </Header>
    </>
  );
};

const StyledHeaderSection = styled(HeaderSection)`
  height: 50px;
  line-height: 50px;
`;

export default StyledHeaderSection;
