import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collapseNav, moveTap } from 'modules/nav';

const { Title } = Typography;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('대시보드', 'dashboard', <PieChartOutlined />),
  getItem('회원관리', 'user', <UserOutlined />, [
    getItem('회원정보', 'userinfo'),
    getItem('사전예약', 'reservation'),
    getItem('설문조사', 'survay'),
  ]),
];

const Nav = ({ className }) => {
  const navigate = useNavigate();
  const nav = useSelector((store) => {
    return store.nav;
  });
  const dispatch = useDispatch();

  const movePage = (e) => {
    const subMenusNum = e.keyPath.length - 1;
    dispatch(moveTap(e.key));
    subMenusNum === 0
      ? navigate(`/${e.key}`)
      : navigate(`/${e.keyPath[1]}/${e.keyPath[0]}`);
  };

  const toggleCollapsed = () => {
    dispatch(collapseNav());
  };

  return (
    <div
      className={className}
      style={{
        width: `${nav.collapsed ? '80px' : '254px'}`,
      }}
    >
      {!nav.collapsed && (
        <TntLogo
          level={2}
          style={{
            color: 'white',
            borderBottom: '1px solid #49494a',
          }}
        >
          TNT
        </TntLogo>
      )}
      {nav.collapsed && <div className='blank'></div>}
      <Button
        type='primary'
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          backgroundColor: '#353535',
          border: 'none',
          position: 'absolute',
          top: '10px',
          right: `${nav.collapsed ? '' : '18px'}`,
          left: `${nav.collapsed ? '18px' : ''}`,
        }}
      >
        {nav.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='dark'
        inlineCollapsed={nav.collapsed}
        items={items}
        onClick={movePage}
        style={{
          backgroundColor: '#353535',
        }}
      />
    </div>
  );
};

const StyledNav = styled(Nav)`
  height: 100vh;
  background-color: #353535;
  position: fixed;

  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background-color: #353535;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: #292929;
  }

  .blank {
    width: 80px;
    height: 50px;
  }
`;

export default StyledNav;

const TntLogo = styled(Title)`
  padding: 10px 30px 0;
`;
