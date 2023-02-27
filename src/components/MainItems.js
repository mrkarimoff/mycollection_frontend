import { RightCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

const MainItems = ({ data }) => {
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
        {data?.map((item) => (
          <Card key={item._id} style={{ cursor: "default" }} hoverable type="inner">
            <Row id="itemRow">
              <Col>
                <Text style={{ fontWeight: 400 }}>{item.itemDate}</Text>
              </Col>
              <Col>
                <Title level={4}>{item.itemName}</Title>
                {item.tags?.map((tag, i) => (
                  <Tag style={{ marginBlock: "3px" }} key={i}>
                    {tag}
                  </Tag>
                ))}
              </Col>
              <Col style={{ marginTop: "7px" }}>
                <Link to={`/items/${item._id}`}>
                  <RightCircleFilled style={{ fontSize: "28px" }} />
                </Link>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>
    </Card>
  );
};
export default MainItems;
