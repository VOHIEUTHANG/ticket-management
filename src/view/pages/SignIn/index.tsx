import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './styles.scss';
import { signIn, onAuthStateChange } from '@data/firebase';

const SignIn = () => {
  const onFinish = (values: { email: string; password: string; remember: boolean }) => {
    const handleSuccess = (userCredential: any) => {
      console.log(userCredential);
    };
    const handleError = (err: any) => console.log(err);
    signIn(values.email, values.password, handleSuccess, handleError);
  };

  const onFinishFailed = (errorInfo: any) => {};

  onAuthStateChange(async (user: any) => {
    console.log('On Auth State Change ...');
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      console.log('🚀 ~ file: index.tsx ~ line 22 ~ onAuthStateChange ~ token', tokenResult?.token);
    } else {
      console.log('User is signed out !');
    }
  });

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h2>Sign In</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Please input your valid email!', required: true }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
