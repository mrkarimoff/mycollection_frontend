import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loader;
