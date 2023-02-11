import { Button, ConfigProvider, Form, Input, Select, Typography, message, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemsTable from "../components/ItemsTable";
import MainHeader from "../components/MainHeader";
import ModalDialog from "../components/ModalDialog";
import Wrapper from "../components/Wrapper";
import { getLanguage, getTheme } from "../redux/users/users.selectors";

const Collection = () => {
  const collectionId = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const { Title } = Typography;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const validateMessages = {
    required: uiLanguage?.validateMessages?.required,
    string: {
      min: uiLanguage?.validateMessages?.min,
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onFinish = (values) => {
    console.log("Values:", values);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      message.success("Submit success!");
    }, 2000);
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const options = [];
  for (let i = 10; i < 136; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <MainHeader />
      <Wrapper>
        <ModalDialog
          title={uiLanguage?.collectionPage?.formElements?.modalTitle}
          {...{ open, setOpen }}
        >
          <Form
            validateMessages={validateMessages}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={uiLanguage?.collectionPage?.formElements?.name?.label}
              name={uiLanguage?.collectionPage?.formElements?.name?.label.toLocaleLowerCase()}
              rules={[
                {
                  required: true,
                },
                {
                  type: "string",
                  min: 6,
                },
              ]}
            >
              <Input placeholder={uiLanguage?.collectionPage?.formElements?.name?.placeholder} />
            </Form.Item>
            <Form.Item
              label={uiLanguage?.collectionPage?.formElements?.tags?.label}
              name={uiLanguage?.collectionPage?.formElements?.tags?.label.toLocaleLowerCase()}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder={uiLanguage?.collectionPage?.formElements?.tags?.placeholder}
                onChange={handleChange}
                options={options}
              />
            </Form.Item>

            <Form.Item style={{ margin: 0 }}>
              <Button
                loading={confirmLoading}
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                {uiLanguage?.collectionPage?.formElements?.submitBtn}
              </Button>
            </Form.Item>
          </Form>
        </ModalDialog>

        <Title style={{ textAlign: "center", marginBlock: "20px" }} level={2}>
          {uiLanguage?.collectionPage?.title}
        </Title>

        <Button
          size="large"
          style={{ marginBottom: "10px", width: "25%", minWidth: "220px" }}
          type="primary"
          onClick={() => setOpen(true)}
        >
          {uiLanguage?.collectionPage?.addItemBtn}
        </Button>

        <ItemsTable uiLanguage={uiLanguage} />
      </Wrapper>
    </ConfigProvider>
  );
};

export default Collection;

/*
name="url"
label="URL"
rules={[
  {
    required: true,
  },
  {
    type: "url",
    warningOnly: false,
  },
  {
    type: "string",
    min: 6,
  },
]} 
 */
