import { Table } from "antd";

const ItemsTable = ({ columns, rowSelection, data, onTableChange, pagination }) => {
  return (
    <div>
      <Table
        pagination={pagination}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={data}
        onChange={onTableChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};
export default ItemsTable;
