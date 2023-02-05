import { RightCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";

const MainItems = () => {
  const { Text, Title } = Typography;
  return (
    <Card loading={false}>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Card style={{ cursor: "default" }} hoverable type="inner">
          <Row id="itemRow">
            <Col>
              <Text style={{ fontWeight: 400 }}>18.02.2023</Text>
            </Col>
            <Col>
              <Title level={4}>The book of Vishanti</Title>
            </Col>
            <Col>
              <Link to={"#"}>
                <RightCircleFilled style={{ fontSize: "28px" }} />
              </Link>
            </Col>
          </Row>
        </Card>
        <Card style={{ cursor: "default" }} hoverable type="inner">
          <Row id="itemRow">
            <Col>
              <Text style={{ fontWeight: 400 }}>02.02.2023</Text>
            </Col>
            <Col>
              <Title level={4}>Gold medal</Title>
            </Col>
            <Col>
              <Link to={"#"}>
                <RightCircleFilled style={{ fontSize: "28px" }} />
              </Link>
            </Col>
          </Row>
        </Card>
        <Card style={{ cursor: "default" }} hoverable type="inner">
          <Row id="itemRow">
            <Col>
              <Text style={{ fontWeight: 400 }}>06.06.1999</Text>
            </Col>
            <Col>
              <Title level={4}>Special stamp</Title>
            </Col>
            <Col>
              <Link to={"#"}>
                <RightCircleFilled style={{ fontSize: "28px" }} />
              </Link>
            </Col>
          </Row>
        </Card>
      </Space>
    </Card>
  );
};
export default MainItems;
