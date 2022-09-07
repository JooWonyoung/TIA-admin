import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, Space, Alert } from 'antd';
import { postLoginApi } from '../../api/login/post';
import { AuthContext } from '../../context/auth';
import styled from 'styled-components';
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: '',
  });
  const fetchData = async (values) => {
    try {
      setLoading(true);
      const params = {
        email: values.email,
        password: values.password,
      };

      await postLoginApi(params).then(({ data }) => {
        if (data.success) {
          localStorage.setItem('login-token', data.data.access_token);
          setAuth(data.data);
          navigate('/');
          window.location.reload();
        }
      });
    } catch (e) {
      console.error(e);
      setError({
        message: '이메일 혹은 패스워드를 확인해주세요.',
        state: true,
      });
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    fetchData(values);
  };

  return (
    <FormContainer>
      <Space
        direction='vertical'
        size='middle'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <LoginTitle level={3}>관리자 로그인</LoginTitle>
        {error.state && (
          <Alert
            message='로그인 실패'
            style={{ width: '300px' }}
            description={error.message}
            type='error'
            showIcon
          />
        )}
        <StyledForm
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: '이메일을 작성해주세요!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '패스워드를 작성해주세요!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{ width: '100%' }}
            >
              {!loading && <span>Log in</span>}
              {loading && <span>Please wait...</span>}
            </Button>
          </Form.Item>
        </StyledForm>
      </Space>
    </FormContainer>
  );
};

export default Login;

const FormContainer = styled.div`
  ${(props) => props.theme.variables.flex('column')}
  width: 100vw;
  height: 100vh;
`;

const StyledForm = styled(Form)`
  width: 300px;
`;

const LoginTitle = styled(Title)`
  ${(props) => props.theme.variables.flex()}
  justify-content : center;
`;
