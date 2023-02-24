import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import eng from "antd/locale/en_US";
import rus from "antd/locale/ru_RU";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import ModalDialog from "../components/ModalDialog";
import TableComponent from "../components/TableComponent";
import TextareaMarkdown from "../components/TextareaMarkdown";
import Wrapper from "../components/Wrapper";
import { initialItemValues } from "../constants/itemInitialValues";
import { makeCustomColums } from "../constants/tableColumns";
import {
  createItem,
  deleteItem,
  getAllTags,
  getCollectionData,
  getItems,
  updateCurrentItem,
  updateItem,
} from "../redux/items/items.reducer";
import {
  getCollectionName,
  getCurrentItem,
  getCustomFields,
  getItemEntities,
  getTags,
} from "../redux/items/items.selectors";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { getLocalRole, getLocalToken, getLocalUsername } from "../utils/localStorage.service";

const Collection = () => {
  const collectionId = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uiLanguage = useSelector(getLanguage());
  const currentItem = useSelector(getCurrentItem());
  const tags = useSelector(getTags());
  const customFields = useSelector(getCustomFields());
  const collectionName = useSelector(getCollectionName());
  const itemEntities = useSelector(getItemEntities());
  const { Title } = Typography;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const role = getLocalRole();
  const token = getLocalToken();
  const username = getLocalUsername();
  const [form] = Form.useForm();

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    if (customFields?.length > 0) {
      dispatch(getItems(collectionId));
    }
  }, [customFields]);

  useEffect(() => {
    if (role && token && username) {
      dispatch(getCollectionData(collectionId));
      dispatch(getAllTags());
    } else {
      navigate("/");
    }
  }, []);

  const customColumns = makeCustomColums(
    customFields,
    uiLanguage?.collectionPage?.tableElements?.tableLang
  );

  const columns = [
    {
      title: uiLanguage?.collectionPage?.tableElements?.name,
      dataIndex: "itemName",
      width: 150,
      sorter: (a, b) => a.itemName.localeCompare(b.itemName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.tags,
      dataIndex: "tags",
      width: 200,
      sorter: (a, b) => a.itemName.localeCompare(b.itemName),
      sortDirections: ["descend", "ascend"],
      render: (tags) =>
        tags?.map((tag, i) => (
          <Tag style={{ marginBlock: "5px" }} key={i} color={"#52c41a"}>
            {tag}
          </Tag>
        )),
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.links,
      dataIndex: "links",
      width: 100,
      render: (_, record) => (
        <Link to={`/items/${record.key}`}>{uiLanguage?.collectionPage?.tableElements?.more}</Link>
      ),
    },
    ...customColumns,
    {
      title: uiLanguage?.collectionPage?.tableElements?.actions,
      dataIndex: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div>
          <Button onClick={() => editItem(record)} style={{ margin: "3px" }}>
            {uiLanguage?.collectionPage?.tableElements?.edBtn}
          </Button>
          <Button
            onClick={() => dispatch(deleteItem({ collectionId, itemId: record.key }))}
            style={{ margin: "3px" }}
          >
            {uiLanguage?.collectionPage?.tableElements?.delBtn}
          </Button>
        </div>
      ),
    },
  ];

  const emptyForm = () => {
    setOpen(false);
    setConfirmLoading(false);
    form.resetFields();
    dispatch(updateCurrentItem(""));
  };

  const onFinish = (values) => {
    if (currentItem === "") {
      // Create Item
      dispatch(createItem({ ...values, collectionId }));
    } else {
      // Update Item
      dispatch(updateItem({ ...values, currentItem }));
    }
    setConfirmLoading(true);
    setTimeout(() => {
      emptyForm();
      message.success(uiLanguage?.userAccount?.formElements?.submitSuccessMsg);
    }, 1500);
  };

  const onFinishFailed = () => {
    message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
  };

  const editItem = (record) => {
    form.setFieldsValue({ ...record });
    setOpen(true);
    dispatch(updateCurrentItem({ itemId: record.key, collectionId }));
  };

  return (
    <ConfigProvider
      locale={uiLanguage?.collectionPage?.tableElements?.tableLang === "eng" ? eng : rus}
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
          onCancel={emptyForm}
          title={uiLanguage?.collectionPage?.formElements?.modalTitle}
          {...{ open, setOpen }}
        >
          <Form
            form={form}
            initialValues={initialItemValues}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={uiLanguage?.collectionPage?.formElements?.name?.label}
              name={"itemName"}
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
              name={"tags"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder={uiLanguage?.collectionPage?.formElements?.tags?.placeholder}
                options={tags?.map((tag) => ({ label: tag?.name, value: tag?.name }))}
              />
            </Form.Item>

            {customFields?.map((field) =>
              field?.type === "number" ? (
                <Form.Item key={field?.field_id} name={field?.name} label={field?.label}>
                  <InputNumber
                    type="number"
                    placeholder={`Enter ${field?.label}`}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              ) : field?.type === "checkbox" ? (
                <Form.Item
                  key={field?.field_id}
                  valuePropName="checked"
                  name={field?.name}
                  label={field?.label}
                >
                  <Checkbox />
                </Form.Item>
              ) : field?.type === "textarea" ? (
                <TextareaMarkdown
                  form={form}
                  key={field?.field_id}
                  label={field?.label}
                  name={field?.name}
                  placeholder={`Enter ${field?.label}`}
                  tab1={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab1}
                  tab2={uiLanguage?.userAccount?.formElements?.textareaMarkdown?.tab2}
                />
              ) : (
                <Form.Item key={field?.field_id} name={field?.name} label={field?.label}>
                  <Input placeholder={`Enter ${field?.label}`} type={field?.type} />
                </Form.Item>
              )
            )}

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
          {collectionName || uiLanguage?.collectionPage?.title}
        </Title>

        <Button
          size="large"
          style={{ marginBottom: "10px", width: "25%", minWidth: "220px" }}
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          {uiLanguage?.collectionPage?.addItemBtn}
        </Button>

        <TableComponent
          pagination={{ pageSize: 5 }}
          columns={columns}
          data={itemEntities?.map((item) => ({
            key: item?._id,
            itemName: item?.itemName,
            tags: item?.tags,
            text1: item?.text1,
            text2: item?.text2,
            text3: item?.text3,
            number1: item?.number1,
            number2: item?.number2,
            number3: item?.number3,
            checkbox1: item?.checkbox1,
            checkbox2: item?.checkbox2,
            checkbox3: item?.checkbox3,
            date1: item?.date1,
            date2: item?.date2,
            date3: item?.date3,
            textarea1: item?.textarea1,
            textarea2: item?.textarea2,
            textarea3: item?.textarea3,
          }))}
        />
      </Wrapper>
    </ConfigProvider>
  );
};

export default Collection;
