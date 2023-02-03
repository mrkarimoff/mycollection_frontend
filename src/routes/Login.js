import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Form, Input, Typography, theme } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../config.json";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTheme } from "../redux/users/users.selectors";
import MainHeader from "../components/MainHeader";

const Login = () => {
  const navigate = useNavigate();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const siteTheme = useSelector(getTheme());
  const { Title } = Typography;
  const validateMessages = {
    required: " ${name} is required!",
    pattern: {
      mismatch: "${name} is invalid ",
    },
  };
  // {withCredentials: true}

  useEffect(() => {
    document.body.style.backgroundColor = siteTheme ? "#444" : "#e2e8f0";
  }, [siteTheme]);

  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: siteTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <MainHeader />
      <div style={{ paddingInline: "20px" }}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <div className="main">
          <div className="main-cont">
            <Title level={2}>Sign in to your account</Title>
            <Title
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: 0,
              }}
            >
              Don't have an account? <Link to={"/register"}>Sign Up</Link>
            </Title>

            <Card
              style={{
                width: "100%",
                padding: "8px",
              }}
            >
              <Form
                validateMessages={validateMessages}
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                  ]}
                >
                  <Input type="email" size="large" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    size="large"
                    placeholder="Enter your password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: "30px" }}>
                  <Button size="large" style={{ width: "100%" }} type="primary" htmlType="submit">
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
