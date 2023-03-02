import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Form, Input, Typography, theme } from "antd";
import eng from "antd/locale/en_US";
import rus from "antd/locale/ru_RU";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { onRegisterStart } from "../redux/users/users.reducer";
import { getLanguage, getRegisterLoading, getTheme } from "../redux/users/users.selectors";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const registerLoading = useSelector(getRegisterLoading());
  const { Title } = Typography;

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onFinish = (values) => {
    delete values.confirm_password;
    dispatch(onRegisterStart({ values, navigate }));
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
              <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                  label={uiLanguage?.registerPage?.username?.label}
                  name={"username"}
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
                  name={"email"}
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
                    size="large"
                    type="password"
                    placeholder={uiLanguage?.registerPage?.password?.placeholder}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <Form.Item
                  label={uiLanguage?.registerPage?.confirmPassword?.label}
                  name={"confirm_password"}
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
                  <Button
                    loading={registerLoading}
                    size="large"
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
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
