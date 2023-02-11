import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Row, Space, Typography, theme } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainHeader from "../components/MainHeader";
import Wrapper from "../components/Wrapper";
import { getTheme } from "../redux/users/users.selectors";

const Item = () => {
  const itemId = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { Title, } = Typography;

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#722ed1",
        },
      }}
    >
      <MainHeader />
      <Wrapper style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
        <Card
          loading={false}
          style={{ cursor: "default", maxWidth: "750px" }}
          hoverable
          actions={[
            <Button type="dashed" icon={<LikeOutlined key="like" />}>
              2
            </Button>,
            <Button type="dashed" icon={<MessageOutlined key="comment" />}>
              23
            </Button>,
          ]}
        >
          <Title style={{ textAlign: "center" }} level={2}>
            Item Name
          </Title>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Row style={{ gap: "10px", justifyContent: "center", alignItems: "flex-start" }}>
              <Col>
                <span
                  style={{
                    display: "inline-block",
                    margin: "0",
                    fontWeight: "500",
                    color: isDarkTheme ? "red" : "#777",
                    width: "120px",
                  }}
                >
                  Description
                </span>
              </Col>
              <Col span={10}>
                <p style={{ margin: "0", fontWeight: "600" }}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias veritatis
                  libero consectetur exercitationem assumenda nemo officiis, maxime quasi ratione
                  eos!
                </p>
              </Col>
            </Row>
            <Row style={{ gap: "10px", justifyContent: "center", alignItems: "flex-start" }}>
              <Col>
                <span
                  style={{
                    display: "inline-block",
                    margin: "0",
                    fontWeight: "500",
                    color: isDarkTheme ? "red" : "#777",
                    width: "120px",
                  }}
                >
                  Tags
                </span>
              </Col>
              <Col span={10}>
                <p style={{ margin: "0", fontWeight: "600" }}>Tag1 Tag2 Tag3 Tag4</p>
              </Col>
            </Row>
          </Space>
        </Card>
      </Wrapper>
    </ConfigProvider>
  );
};

export default Item;
