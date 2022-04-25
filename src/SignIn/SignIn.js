import React from "react";
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';

function SignIn({ login }) {
  const onFinish = (values) => {
    register(values);
  };

  function register(values) {
    const baseUrl = 'http://localhost:3001';
    Axios.post(`${baseUrl}/signin`, { username: values.username, password: values.password })
      .then((response) => {
        if (response.status === 201) {
          message.success(response.data.msg);
          login();
        }
        else {
          message.error(response.data.msg);
        }
      })
      .catch((errorInfo) => {
        message.error(errorInfo.response.data.msg);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ margin: "20%", padding: 10, alignItems: "center" }}
    >
      {loginField()}
      {passwordField()}
      {buttonRegister()}
    </Form>
  );

  function loginField() {
    return (
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Username is required!' },
          { pattern: new RegExp("^[a-zA-Z0-9]*$"), message: 'Username can be only with letters and numbers' },
          { min: 5, message: 'Username has to have at least 5 sings' }
        ]}
      >
        <Input />
      </Form.Item>
    );
  }

  function passwordField() {
    return (
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' },
        { min: 8, message: 'Password has to have at least 8 sings' },
        { pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*", message: 'Password has to have 1 uppercase letter, 1 number, 1 lowercase' }
        ]}
      >
        <Input.Password />
      </Form.Item>
    );
  }

  function buttonRegister() {
    return (
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    )
  }
};

export { SignIn }