import { Button, ConfigProvider, Form, Input, Select, message, theme } from "antd";
import Title from "antd/es/typography/Title";
import eng from "antd/locale/en_US";
import rus from "antd/locale/ru_RU";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CollectionsLayout from "../components/CollectionsLayout";
import CustomFields from "../components/CustomFields";
import MainHeader from "../components/MainHeader";
import ModalDialog from "../components/ModalDialog";
import TextareaMarkdown from "../components/TextareaMarkdown";
import UploadImage from "../components/UploadImage";
import Wrapper from "../components/Wrapper";
import { fieldTypesEng, fieldTypesRu } from "../constants/fieldTypes";
import { topicsEng, topicsRu } from "../constants/topics";
import {
  changeCurrentCollection,
  createCollection,
  getCollections,
  updateCollection,
} from "../redux/collections/collections.reducer";
import {
  getCollectionEntities,
  getCollectionsLoading,
  getCurrentCollection,
} from "../redux/collections/collections.selectors";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { getLocalRole, getLocalToken, getLocalUsername } from "../utils/localStorage.service";
import Loader from "../components/Loader";

const UserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const currentCollection = useSelector(getCurrentCollection());
  const collectionEntities = useSelector(getCollectionEntities());
  const token = getLocalToken();
  const role = getLocalRole();
  const username = getLocalUsername();
  const uiLanguage = useSelector(getLanguage());
  const collectionsLoading = useSelector(getCollectionsLoading());
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [fieldTypes, setFieldTypes] = useState(
    uiLanguage?.userAccount?.formElements?.customFields?.fieldTypes === "eng"
      ? fieldTypesEng
      : fieldTypesRu
  );
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setFieldTypes(
      uiLanguage?.userAccount?.formElements?.customFields?.fieldTypes === "eng"
        ? fieldTypesEng
        : fieldTypesRu
    );
  }, [uiLanguage?.userAccount?.formElements?.customFields?.fieldTypes]);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    if (role && username && token) {
      dispatch(getCollections(urlParams));
    } else {
      navigate("/");
    }
  }, [urlParams]);

  const validateCustomFields = () => {
    let isValid = true;
    const validatedFields = fields?.map((field) => {
      if (field?.label === "" || field?.type === "") {
        isValid = false;
        return { ...field, invalid: true };
      }
      return { ...field, invalid: false };
    });
    setFields(validatedFields);
    return isValid;
  };

  const onFinish = (values) => {
    const isFieldsValid = validateCustomFields();

    if (isFieldsValid) {
      if (currentCollection === "") {
        // Create Collection
        dispatch(createCollection({ ...values, customFields: fields, urlParams }));
      } else {
        // Update Collection
        dispatch(
          updateCollection({ ...values, customFields: fields, urlParams, currentCollection })
        );
      }
      setConfirmLoading(true);
      setTimeout(() => {
        emptyForm();
        message.success(uiLanguage?.userAccount?.formElements?.submitSuccessMsg);
      }, 1500);
    } else {
      message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
    }
  };

  const onFinishFailed = () => {
    message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
    validateCustomFields();
  };

  const emptyForm = () => {
    dispatch(changeCurrentCollection(""));
    setOpen(false);
    setConfirmLoading(false);
    form.resetFields();
    setFileList([]);
    setFields([]);
    setFieldTypes(
      uiLanguage?.userAccount?.formElements?.customFields?.fieldTypes === "eng"
        ? fieldTypesEng
        : fieldTypesRu
    );
  };

  return (
    <ConfigProvider
      locale={uiLanguage?.validateMessages === "eng" ? eng : rus}
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#13c2c2",
        },
      }}
    >
      <MainHeader />
      {collectionsLoading ? (
        <Loader />
      ) : (
        <Wrapper style={{ marginBottom: "20px" }}>
          <ModalDialog
            title={uiLanguage?.userAccount?.formElements?.modalTitle}
            {...{ open, setOpen, onCancel: emptyForm }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <UploadImage
                {...{ fileList, setFileList, form }}
                uploadImageLang={uiLanguage?.userAccount?.formElements?.collectionImg}
              />
              <Form.Item
                label={uiLanguage?.userAccount?.formElements?.collectionName?.label}
                name={"collectionName"}
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
                name={"topic"}
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
                form={form}
                label={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.label}
                name={"description"}
                placeholder={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.placeholder}
                tab1={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab1}
                tab2={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab2}
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
                {...{ fields, setFields, fieldTypes, setFieldTypes }}
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

          <Title style={{ textAlign: "center" }} level={3}>
            {uiLanguage?.greeting} {username}
          </Title>
          <div style={{ marginBlock: "20px", textAlign: "center" }}>
            <Title level={4}>{uiLanguage?.userAccount?.title}</Title>
            <Button
              size="large"
              style={{ marginBottom: "10px", width: "25%", minWidth: "220px" }}
              type="primary"
              onClick={() => setOpen(true)}
            >
              {uiLanguage?.userAccount?.addCollectionBtn}
            </Button>
          </div>

          <CollectionsLayout {...{ form, setOpen, setFields }} data={collectionEntities} />
        </Wrapper>
      )}
    </ConfigProvider>
  );
};
export default UserAccount;
