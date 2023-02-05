import React from "react";
import { Row, Col, Card, Typography } from "antd";

export default function CollectionsLayout() {
  const { Title, Paragraph } = Typography;
  return (
    <Row style={{ gap: "15px", justifyContent: "center", alignItems: "center" }}>
      <Col>
        <Card
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Drinks</div>
          <div style={{ backgroundImage: "url(/drinks.jpg)" }} className="collectionPic"></div>
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite drinks
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Coins</div>
          <div style={{ backgroundImage: "url(/Coins.jpg)" }} className="collectionPic"></div>
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite coins
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Books</div>
          <div style={{ backgroundImage: "url(/books.webp)" }} className="collectionPic"></div>
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite books
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Books</div>
          <div style={{ backgroundImage: "url(/books.webp)" }} className="collectionPic"></div>
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite books
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Books</div>
          <div style={{ backgroundImage: "url(/books.webp)" }} className="collectionPic"></div>
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite books
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          bordered={false}
          style={{
            width: 280,
            padding: 0,
          }}
        >
          <div className="topic">Books</div>
          {/* <div style={{ backgroundImage: "url(/books.webp)" }} className="collectionPic"></div> */}
          <Title style={{ textAlign: "center", marginBottom: "5px" }} level={4}>
            My favorite books
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
}
