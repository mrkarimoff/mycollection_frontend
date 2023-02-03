import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import "./mainBody.css";

const MainBody = ({ isDarkTheme }) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ width: "800px" }}>
      <Sider
        width={"260px"}
        collapsedWidth={"200px"}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          style={{
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <Title style={{ textAlign: "center", margin: "5px", color: "red" }} level={4}>
          Biggest Collections
        </Title>
        <div className="collection-cont">
          <div className="collection" style={{ backgroundColor: isDarkTheme ? "#141414" : "#fff" }}>
            <Title level={5} style={{ textAlign: "center" }}>
              Collection title
            </Title>
            <Paragraph style={{ textAlign: "center", width: "80%", fontWeight: 300 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, exercitationem.
            </Paragraph>
          </div>
        </div>
        <div className="collection-cont">
          <div className="collection" style={{ backgroundColor: isDarkTheme ? "#141414" : "#fff" }}>
            <Title level={5} style={{ textAlign: "center" }}>
              Collection title
            </Title>
            <Paragraph style={{ textAlign: "center", width: "80%", fontWeight: 300 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, exercitationem.
            </Paragraph>
          </div>
        </div>
        <div className="collection-cont">
          <div className="collection" style={{ backgroundColor: isDarkTheme ? "#141414" : "#fff" }}>
            <Title level={5} style={{ textAlign: "center" }}>
              Collection title
            </Title>
            <Paragraph style={{ textAlign: "center", width: "80%", fontWeight: 300 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, exercitationem.
            </Paragraph>
          </div>
        </div>
      </Sider>
    </Layout>
  );
};
export default MainBody;
