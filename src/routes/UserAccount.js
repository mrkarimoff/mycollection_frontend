import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { Button, ConfigProvider, Form, Input, Select, message, theme } from "antd";
import MainHeader from "../components/MainHeader";
import Wrapper from "../components/Wrapper";
import Title from "antd/es/typography/Title";
import CollectionsLayout from "../components/CollectionsLayout";
import ModalDialog from "../components/ModalDialog";
import TextareaMarkdown from "../components/TextareaMarkdown";
import UploadImage from "../components/UploadImage";
import { topicsEng, topicsRu } from "../constants/topics";
import CustomFields from "../components/CustomFields";

const UserAccount = () => {
  const username = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [markdownText, setMarkdownText] = useState("");
  const [form] = Form.useForm();
  const validateMessages = {
    required: uiLanguage?.validateMessages?.required,
    string: {
      min: uiLanguage?.validateMessages?.min,
    },
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const validateCustomFields = () => {
    let isValid = true;
    const validatedFields = fields?.map((field) => {
      if (field?.fieldName === "" || field?.type === "") {
        isValid = false;
        return { ...field, invalid: true };
      }
      return { ...field, invalid: false };
    });
    setFields(validatedFields);
    return isValid;
  };

  const onFinish = async (values) => {
    const isFieldsValid = validateCustomFields();

    if (isFieldsValid) {
      let img = await values.collectionImg;
      const newValues = { ...values, collectionImg: img, customFields: fields };
      console.log("Form Values", newValues);

      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        message.success(uiLanguage?.userAccount?.formElements?.submitSuccessMsg);
        form.resetFields();
        setFileList([]);
        setFields([]);
        setMarkdownText("");
      }, 2000);
    } else {
      message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
    }
  };

  const onFinishFailed = () => {
    message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
    validateCustomFields();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#13c2c2",
        },
      }}
    >
      <MainHeader />
      <Wrapper style={{ marginBottom: "20px" }}>
        <ModalDialog
          title={uiLanguage?.userAccount?.formElements?.modalTitle}
          {...{ open, setOpen }}
        >
          <Form
            form={form}
            validateMessages={validateMessages}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <UploadImage
              {...{ fileList, setFileList }}
              uploadImageLang={uiLanguage?.userAccount?.formElements?.collectionImg}
            />
            <Form.Item
              label={uiLanguage?.userAccount?.formElements?.collectionName?.label}
              name={uiLanguage?.userAccount?.formElements?.collectionName?.label.toLocaleLowerCase()}
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
              <Input
                placeholder={uiLanguage?.userAccount?.formElements?.collectionName?.placeholder}
              />
            </Form.Item>
            <Form.Item
              label={uiLanguage?.userAccount?.formElements?.topic?.label}
              name={uiLanguage?.userAccount?.formElements?.topic?.label.toLocaleLowerCase()}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch={"single"}
                style={{
                  width: "100%",
                }}
                placeholder={uiLanguage?.userAccount?.formElements?.topic?.placeholder}
                options={
                  uiLanguage?.userAccount?.formElements?.topic?.topics === "eng"
                    ? topicsEng
                    : topicsRu
                }
              />
            </Form.Item>

            <TextareaMarkdown
              label={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.label}
              name={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.label.toLocaleLowerCase()}
              placeholder={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.placeholder}
              tab1={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab1}
              tab2={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab2}
              {...{ markdownText, setMarkdownText }}
              rules={[
                {
                  required: true,
                },
                {
                  type: "string",
                  min: 20,
                },
              ]}
            />
            <hr />
            <CustomFields
              {...{ fields, setFields }}
              customFieldsLang={uiLanguage?.userAccount?.formElements?.customFields}
            />
            <Form.Item style={{ margin: 0, marginTop: "20px" }}>
              <Button
                loading={confirmLoading}
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                {uiLanguage?.userAccount?.submitBtn}
              </Button>
            </Form.Item>
          </Form>
        </ModalDialog>

        <div style={{ marginBlock: "20px", textAlign: "center" }}>
          <Title level={2}>{uiLanguage?.userAccount?.title}</Title>
          <Button
            size="large"
            style={{ marginBottom: "10px", width: "25%", minWidth: "220px" }}
            type="primary"
            onClick={() => setOpen(true)}
          >
            {uiLanguage?.userAccount?.addCollectionBtn}
          </Button>
        </div>

        <CollectionsLayout />
      </Wrapper>
    </ConfigProvider>
  );
};

export default UserAccount;
