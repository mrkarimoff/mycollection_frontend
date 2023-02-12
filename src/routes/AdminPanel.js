import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Card, ConfigProvider, theme } from "antd";
import Title from "antd/es/typography/Title";
import eng from "antd/locale/en_US";
import rus from "antd/locale/ru_RU";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainHeader from "../components/MainHeader";
import TableComponent from "../components/TableComponent";
import Wrapper from "../components/Wrapper";
import { adminColumnsEng, adminColumnsRu } from "../constants/tableColumns";
import { getLanguage, getTheme } from "../redux/users/users.selectors";

const AdminPanel = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [blockLoading, setBlockLoading] = useState(false);
  const [unBlockLoading, setUnBlockLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [removeAdminLoading, setRemoveAdminLoading] = useState(false);
  const hasSelected = selectedRowKeys.length > 0;

  const data = [
    {
      key: "234234",
      id: "234234",
      username: "Deadshot",
      email: "deadshot@gmail.com",
      role: "Admin",
      status: 1,
    },
    {
      key: "trt3434",
      id: "trt3434",
      username: "Azizbek",
      email: "azizbek@gmail.com",
      role: "User",
      status: 0,
    },
    {
      key: "12sdf4rew",
      id: "12sdf4rew",
      username: "Shoqosim",
      email: "shoqosim@gmail.com",
      role: "User",
      status: 1,
    },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const blockUser = () => {
    setBlockLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setBlockLoading(false);
    }, 2000);
  };

  const unBlockUser = () => {
    setUnBlockLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setUnBlockLoading(false);
    }, 2000);
  };

  const deleteUser = () => {
    setDeleteLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setDeleteLoading(false);
    }, 2000);
  };

  const makeAdmin = () => {
    setAdminLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setAdminLoading(false);
    }, 2000);
  };

  const removeAdmin = () => {
    setRemoveAdminLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setRemoveAdminLoading(false);
    }, 2000);
  };

  return (
    <ConfigProvider
      locale={uiLanguage?.adminPanel?.tableLang === "eng" ? eng : rus}
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#c41d7f",
        },
      }}
    >
      <MainHeader />
      <Wrapper style={{ marginTop: "30px" }}>
        <Title style={{ textAlign: "center" }} level={2}>
          {uiLanguage?.adminPanel?.title}
        </Title>
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              icon={<LockOutlined />}
              size="medium"
              onClick={blockUser}
              disabled={!hasSelected}
              loading={blockLoading}
            >
              {uiLanguage?.adminPanel?.blockBtn}
            </Button>
            <Button
              icon={<UnlockOutlined />}
              size="medium"
              style={{ border: "1px solid #b7eb8f", color: "#389e0d" }}
              onClick={unBlockUser}
              disabled={!hasSelected}
              loading={unBlockLoading}
            >
              {uiLanguage?.adminPanel?.unblockBtn}
            </Button>
            <Button
              icon={<DeleteOutlined />}
              size="medium"
              style={{ border: "1px solid red", color: "red" }}
              onClick={deleteUser}
              disabled={!hasSelected}
              loading={deleteLoading}
            >
              {uiLanguage?.adminPanel?.deleteBtn}
            </Button>
            <Button
              icon={<UserAddOutlined />}
              size="medium"
              style={{ border: "1px solid #13c2c2", color: "#13c2c2" }}
              onClick={makeAdmin}
              disabled={!hasSelected}
              loading={adminLoading}
            >
              {uiLanguage?.adminPanel?.makeAdminBtn}
            </Button>
            <Button
              icon={<UserDeleteOutlined />}
              size="medium"
              style={{ border: "1px solid #faad14", color: "#faad14" }}
              onClick={removeAdmin}
              disabled={!hasSelected}
              loading={removeAdminLoading}
            >
              {uiLanguage?.adminPanel?.removeAdminBtn}
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected
                ? `${uiLanguage?.adminPanel?.selectedMsg} ${selectedRowKeys.length}`
                : ""}
            </span>
          </div>
        </Card>
        <TableComponent
          pagination={{ pageSize: 5 }}
          rowSelection={rowSelection}
          columns={uiLanguage?.adminPanel?.tableLang === "eng" ? adminColumnsEng : adminColumnsRu}
          data={data}
        />
      </Wrapper>
    </ConfigProvider>
  );
};

export default AdminPanel;
