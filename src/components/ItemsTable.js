import { Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";

const ItemsTable = ({ uiLanguage }) => {
  const columns = [
    {
      title: uiLanguage?.collectionPage?.tableElements?.name,
      dataIndex: "name",
      width: 120,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: uiLanguage?.collectionPage?.tableElements?.tags,
      dataIndex: "tags",
      width: 120,
      sorter: (a, b) => a.tags.localeCompare(b.tags),
      sortDirections: ["descend", "ascend"],
      render: (tags) => <Tag color={"green"}>{tags}</Tag>,
      filters: [
        {
          text: "Old Items",
          value: "old",
        },
        {
          text: "New Items",
          value: "new",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tags.startsWith(value),
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
      name: "Book1",
      tags: "old",
    },
    {
      key: "rwerwerw",
      name: "Book2",
      tags: "new",
    },
    {
      key: "234terer",
      name: "Book3",
      tags: "new",
    },
    {
      key: "gfh455",
      name: "Book4",
      tags: "old",
    },
    {
      key: "567ughjg",
      name: "Book5",
      tags: "old",
    },
    {
      key: "65ughjgh",
      name: "Book6",
      tags: "old",
    },
    {
      key: "nvbnty65",
      name: "Book7",
      tags: "old",
    },
    {
      key: "25trgfh5",
      name: "Book8",
      tags: "old",
    },
    {
      key: "2343tyhfgh56p",
      name: "Book9",
      tags: "old",
    },
    {
      key: "67867fhfghgf2",
      name: "Book10",
      tags: "old",
    },
    {
      key: "1321fgdg54wewe",
      name: "Book11",
      tags: "old",
    },
    {
      key: "sdf2342fsd",
      name: "Book12",
      tags: "old",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", filters);
  };

  return (
    <div>
      <Table
        pagination={{ pageSize: 5 }}
        scroll={{
          x: 1100,
        }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};
export default ItemsTable;
