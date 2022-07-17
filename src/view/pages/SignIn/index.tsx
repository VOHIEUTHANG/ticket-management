import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './styles.scss';
import { signIn, onAuthStateChange, logOut, updateProflie } from '@data/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelector } from 'src/app/selector';
import { addProfile, IprofileState } from 'src/app/profileSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChange(async (user: any) => {
      console.log('On Auth State Change ...');
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const userProfile: IprofileState = {
            statusLogin: true,
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
            },
            token: idToken,
            remember: true,
          };
          dispatch(addProfile(userProfile));
        } catch (error) {}
      } else {
        console.log('User is signed out !');
      }
    });
  }, []);
  const currentProfile = useSelector(profileSelector);
  if (currentProfile.statusLogin === true) {
    navigate('/');
  }
  const onFinish = (values: { email: string; password: string; remember: boolean }) => {
    const handleSuccess = (userCredential: any) => {
      console.log(userCredential);
    };
    const handleError = (err: any) => console.log(err);
    signIn(values.email, values.password, handleSuccess, handleError);
  };

  const onFinishFailed = (errorInfo: any) => {};

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
