import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Form, Input, Typography, theme } from "antd";
import eng from "antd/locale/en_US";
import rus from "antd/locale/ru_RU";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { onLoginStart } from "../redux/users/users.reducer";
import { getLanguage, getTheme } from "../redux/users/users.selectors";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const { Title } = Typography;
  // {withCredentials: true}

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onFinish = (values) => {
    dispatch(onLoginStart({ values, navigate }));
  };

  return (
    <ConfigProvider
      locale={uiLanguage?.validateMessages === "eng" ? eng : rus}
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <MainHeader />
      <div style={{ paddingInline: "20px" }}>
        <div className="main">
          <div className="main-cont">
            <Title level={2}>{uiLanguage?.loginPage?.title}</Title>
            <Title
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "500",
                marginTop: 0,
              }}
            >
              {uiLanguage?.loginPage?.question}{" "}
              <Link to={"/register"}>{uiLanguage?.loginPage?.link}</Link>
            </Title>

            <Card
              style={{
                width: "100%",
                padding: "8px",
              }}
            >
              <Form
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label={uiLanguage?.loginPage?.email?.label}
                  name={"email"}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: uiLanguage?.emailInvalidMsg,
                    },
                  ]}
                >
                  <Input
                    type="email"
                    size="large"
                    placeholder={uiLanguage?.loginPage?.email?.placeholder}
                  />
                </Form.Item>

                <Form.Item
                  label={uiLanguage?.loginPage?.password?.label}
                  name={"password"}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "string",
                      min: 8,
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    size="large"
                    placeholder={uiLanguage?.loginPage?.password?.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: "30px" }}>
                  <Button size="large" style={{ width: "100%" }} type="primary" htmlType="submit">
                    {uiLanguage?.loginPage?.btn}
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
