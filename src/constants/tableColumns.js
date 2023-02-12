import { Tag } from "antd";
import { Link } from "react-router-dom";

export const adminColumnsRu = [
  {
    title: "ИД",
    dataIndex: "id",
    fixed: "left",
    width: "10%",
  },
  {
    title: "Имя пользователя",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Электронная почта",
    dataIndex: "email",
  },
  {
    title: "Роль",
    dataIndex: "role",
    render: (role) => (
      <Tag color={role === "Admin" ? "blue-inverse" : "green-inverse"}>
        {role === "Admin" ? "Администратор" : "Пользователь"}
      </Tag>
    ),
    filters: [
      {
        text: "Админы",
        value: "Admin",
      },
      {
        text: "Пользователи",
        value: "User",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.role.startsWith(value),
  },
  {
    title: "Статус",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === 1 ? "green" : "red"}>{status === 1 ? "активный" : "заблокирован"}</Tag>
    ),
    filters: [
      {
        text: "Активные пользователи",
        value: 1,
      },
      {
        text: "Заблокированные пользователи",
        value: 0,
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Профиль",
    render: (text, record) => <Link to={`/${record.key}`}>Страница</Link>,
  },
];

export const adminColumnsEng = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: "left",
    width: "10%",
  },
  {
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => a.username.localeCompare(b.username),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (role) => (
      <Tag color={role === "Admin" ? "blue-inverse" : "green-inverse"}>
        {role === "Admin" ? "Admin" : "User"}
      </Tag>
    ),
    filters: [
      {
        text: "Admins",
        value: "Admin",
      },
      {
        text: "Users",
        value: "User",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.role.startsWith(value),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === 1 ? "green" : "red"}>{status === 1 ? "active" : "blocked"}</Tag>
    ),
    filters: [
      {
        text: "Active Users",
        value: 1,
      },
      {
        text: "Blocked Users",
        value: 0,
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Account",
    render: (text, record) => <Link to={`/${record.key}`}>Page</Link>,
  },
];
