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
import { useSelector, useDispatch } from "react-redux";
import MainHeader from "../components/MainHeader";
import Loader from "../components/Loader";
import TableComponent from "../components/TableComponent";
import Wrapper from "../components/Wrapper";
import { adminColumnsEng, adminColumnsRu } from "../constants/tableColumns";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { getLocalRole, getLocalToken } from "../utils/localStorage.service";
import { useNavigate } from "react-router-dom";
import { getUserEntities, getUserLoading } from "../redux/admin/admin.selectors";
import { updateUsers, getUsers, deleteUsers } from "../redux/admin/admin.reducer";

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoading = useSelector(getUserLoading());
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const users = useSelector(getUserEntities());
  const token = getLocalToken();
  const role = getLocalRole();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [blockLoading, setBlockLoading] = useState(false);
  const [unBlockLoading, setUnBlockLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [removeAdminLoading, setRemoveAdminLoading] = useState(false);
  const hasSelected = selectedRowKeys.length > 0;

  const data = users?.map((user) => ({
    key: user._id,
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  }));

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    if (token && role === "Admin") {
      dispatch(getUsers());
    } else {
      navigate("/");
    }
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const blockUser = () => {
    setBlockLoading(true);
    dispatch(updateUsers({ ids: selectedRowKeys, update: { status: 0 }, navigate }));
    setTimeout(() => {
      setSelectedRowKeys([]);
      setBlockLoading(false);
    }, 1500);
  };

  const unBlockUser = () => {
    setUnBlockLoading(true);
    dispatch(updateUsers({ ids: selectedRowKeys, update: { status: 1 }, navigate }));
    setTimeout(() => {
      setSelectedRowKeys([]);
      setUnBlockLoading(false);
    }, 1500);
  };

  const deleteUser = () => {
    setDeleteLoading(true);
    dispatch(deleteUsers({ ids: selectedRowKeys, navigate }));
    setTimeout(() => {
      setSelectedRowKeys([]);
      setDeleteLoading(false);
    }, 1500);
  };

  const makeAdmin = () => {
    setAdminLoading(true);
    dispatch(updateUsers({ ids: selectedRowKeys, update: { role: "Admin" }, navigate }));
    setTimeout(() => {
      setSelectedRowKeys([]);
      setAdminLoading(false);
    }, 1500);
  };

  const removeAdmin = () => {
    setRemoveAdminLoading(true);
    dispatch(updateUsers({ ids: selectedRowKeys, update: { role: "User" }, navigate }));
    setTimeout(() => {
      setSelectedRowKeys([]);
      setRemoveAdminLoading(false);
    }, 1500);
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
      {userLoading ? (
        <Loader />
      ) : (
        <Wrapper style={{ marginTop: "30px" }}>
          <Title style={{ textAlign: "center" }} level={2}>
            {uiLanguage?.adminPanel?.title}
          </Title>
          <div>
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
              columns={
                uiLanguage?.adminPanel?.tableLang === "eng" ? adminColumnsEng : adminColumnsRu
              }
              data={data}
            />
          </div>
        </Wrapper>
      )}
    </ConfigProvider>
  );
};

export default AdminPanel;
