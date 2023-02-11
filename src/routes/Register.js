import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Form, Input, Typography, theme } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import MainHeader from "../components/MainHeader";

const Register = () => {
  const navigate = useNavigate();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const { Title } = Typography;
  const validateMessages = {
    required: uiLanguage?.validateMessages?.required,
    pattern: {
      mismatch: uiLanguage?.validateMessages?.invalid,
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
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
        <div className="main signup">
          <div className="main-cont">
            <Title level={2}>{uiLanguage?.registerPage?.title}</Title>
            <Title
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: 0,
              }}
            >
              {uiLanguage?.registerPage?.question}{" "}
              <Link to={"/login"}>{uiLanguage?.registerPage?.link}</Link>
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label={uiLanguage?.registerPage?.username?.label}
                  name={uiLanguage?.registerPage?.username?.label.toLocaleLowerCase()}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={uiLanguage?.registerPage?.username?.placeholder}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>

                <Form.Item
                  label={uiLanguage?.registerPage?.email?.label}
                  name={uiLanguage?.registerPage?.email?.label.toLocaleLowerCase()}
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                  ]}
                >
                  <Input
                    type="email"
                    size="large"
                    placeholder={uiLanguage?.registerPage?.email?.placeholder}
                  />
                </Form.Item>

                <Form.Item
                  label={uiLanguage?.registerPage?.password?.label}
                  name={uiLanguage?.registerPage?.password?.label.toLocaleLowerCase()}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    type="password"
                    placeholder={uiLanguage?.registerPage?.password?.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item
                  label={uiLanguage?.registerPage?.confirmPassword?.label}
                  name={uiLanguage?.registerPage?.confirmPassword?.label.toLocaleLowerCase()}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(uiLanguage?.registerPage?.confirmPassword?.noMatchMessage)
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    type="password"
                    size="large"
                    placeholder={uiLanguage?.registerPage?.confirmPassword?.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: "30px" }}>
                  <Button size="large" style={{ width: "100%" }} type="primary" htmlType="submit">
                    {uiLanguage?.registerPage?.btn}
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

export default Register;
