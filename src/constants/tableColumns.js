import { Tag } from "antd";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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

export const makeCustomColums = (customFields, lang) => {
  return customFields?.map((field) => ({
    title: field?.label,
    dataIndex: field?.name,
    width:
      field?.type === "number" || field?.type === "checkbox"
        ? 80
        : field?.type === "textarea"
        ? 200
        : 150,
    ...(field?.type === "checkbox" && {
      render: (value) =>
        value ? (
          <Tag color="green">{lang === "eng" ? "True" : "Истинный"}</Tag>
        ) : (
          <Tag color="red">{lang === "eng" ? "False" : "Ложный"}</Tag>
        ),
      filters: [
        {
          text: lang === "eng" ? "True values" : "Истинные значения",
          value: true,
        },
        {
          text: lang === "eng" ? "False values" : "Ложные значения",
          value: false || null,
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record[field?.name] === value,
    }),
    ...(field?.type === "number" && {
      filters: [
        {
          text: lang === "eng" ? "Negative numbers" : "Отрицательные числа",
          value: false,
        },
        {
          text: lang === "eng" ? "Positive numbers" : "Положительные числа",
          value: true,
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => value === record[field?.name] >= 0,
    }),
    ...(field?.type === "textarea" && {
      render: (value) => <ReactMarkdown>{value}</ReactMarkdown>,
    }),
  }));
};
