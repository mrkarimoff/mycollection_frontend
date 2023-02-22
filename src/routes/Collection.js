import { Button, ConfigProvider, Form, Input, Select, Tag, Typography, message, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../components/TableComponent";
import MainHeader from "../components/MainHeader";
import ModalDialog from "../components/ModalDialog";
import Wrapper from "../components/Wrapper";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { Link } from "react-router-dom";
import rus from "antd/locale/ru_RU";
import eng from "antd/locale/en_US";
import { getCollectionCustomFields } from "../redux/items/items.reducer";
import { getCustomFields } from "../redux/items/items.selectors";

const Collection = () => {
  const collectionId = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const dispatch = useDispatch();
  const uiLanguage = useSelector(getLanguage());
  const customFields = useSelector(getCustomFields());
  const { Title } = Typography;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const pagination = { pageSize: 5 };
  const validateMessages = {
    required: uiLanguage?.validateMessages?.required,
    string: {
      min: uiLanguage?.validateMessages?.min,
    },
  };

  useEffect(() => {
    dispatch(getCollectionCustomFields(collectionId));
  }, []);

  const columns = [
    {
      title: uiLanguage?.collectionPage?.tableElements?.name,
      dataIndex: "itemName",
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.tags,
      dataIndex: "tags",
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      render: (tags) =>
        tags?.map((tag, i) => (
          <Tag key={i} color={"#52c41a"}>
            {tag}
          </Tag>
        )),
      // filters: [
      //   {
      //     text: "Old Items",
      //     value: "old",
      //   },
      //   {
      //     text: "New Items",
      //     value: "new",
      //   },
      // ],
      // filterMode: "tree",
      // filterSearch: true,
      // onFilter: (value, record) => record.tags.startsWith(value),
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.links,
      dataIndex: "links",
      width: 100,
      render: (text, record) => (
        <Link to={`/items/${record.key}`}>{uiLanguage?.collectionPage?.tableElements?.more}</Link>
      ),
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.actions,
      dataIndex: "actions",
      fixed: "right",
      width: 60,
      render: () => (
        <div>
          <Button style={{ margin: "3px" }}>
            {uiLanguage?.collectionPage?.tableElements?.edBtn}
          </Button>
          <Button style={{ margin: "3px" }}>
            {uiLanguage?.collectionPage?.tableElements?.delBtn}
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "234234",
      itemName: "Book1",
      tags: ["old", "new", "hello"],
    },
    {
      key: "rwerwerw",
      itemName: "Book2",
      tags: ["old", "new", "hello"],
    },
    {
      key: "234terer",
      itemName: "Book3",
      tags: ["old", "new", "hello"],
    },
    {
      key: "gfh455",
      itemName: "Book4",
      tags: ["old", "new", "hello"],
    },
    {
      key: "567ughjg",
      itemName: "Book5",
      tags: ["old", "new", "hello"],
    },
    {
      key: "65ughjgh",
      itemName: "Book6",
      tags: ["old", "new", "hello"],
    },
    {
      key: "nvbnty65",
      itemName: "Book7",
      tags: ["old", "new", "hello"],
    },
    {
      key: "25trgfh5",
      itemName: "Book8",
      tags: ["old", "new", "hello"],
    },
    {
      key: "2343tyhfgh56p",
      itemName: "Book9",
      tags: ["old", "new", "hello"],
    },
    {
      key: "67867fhfghgf2",
      itemName: "Book10",
      tags: ["old", "new", "hello"],
    },
    {
      key: "1321fgdg54wewe",
      itemName: "Book11",
      tags: ["old", "new", "hello"],
    },
    {
      key: "sdf2342fsd",
      itemName: "Book12",
      tags: ["old", "new", "hello"],
    },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onTableChange = (pagination, filters, sorter, extra) => {
    console.log("params", filters);
  };

  const onFinish = (values) => {
    console.log("Values:", values);
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      message.success(uiLanguage?.userAccount?.formElements?.submitSuccessMsg);
    }, 2000);
  };
  const onFinishFailed = () => {
    message.error(uiLanguage?.userAccount?.formElements?.submitFailsMsg);
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
              name={"name"}
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

        <TableComponent {...{ columns, data, onTableChange, pagination }} />
      </Wrapper>
    </ConfigProvider>
  );
};

export default Collection;
