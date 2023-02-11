import React from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLanguage } from "../redux/users/users.selectors";

export default function CollectionsLayout() {
  const pathname = window.location.pathname;
  const { Title, Paragraph } = Typography;
  const uiLanguage = useSelector(getLanguage());
  return (
    <Row style={{ gap: "15px", justifyContent: "center", alignItems: "center" }}>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Drinks</div>
          <Link to={"/collections/1"}>
            <div style={{ backgroundImage: "url(/drinks.jpg)" }} className="collectionPic"></div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>My favorite drinks</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Coins</div>
          <Link to={"/collections/2"}>
            <div style={{ backgroundImage: "url(/coins.jpg)" }} className="collectionPic"></div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>My favorite coins</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Books</div>
          <Link to={"/collections/3"}>
            <div style={{ backgroundImage: "url(/books.webp)" }} className="collectionPic"></div>
            <div style={{ fontSize: "20px", textAlign: "center" }}>My favorite books</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Topic</div>
          <Link to={"/collections/4"}>
            <div style={{ fontSize: "20px", textAlign: "center" }}>Some Collection</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Topic</div>
          <Link to={"/collections/5"}>
            <div style={{ fontSize: "20px", textAlign: "center" }}>Some Collection</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
      <Col>
        <Card
          hoverable
          loading={false}
          bordered={false}
          style={{
            width: 280,
            padding: 0,
            cursor: "default",
          }}
          actions={
            pathname === "/"
              ? null
              : [
                  <Button>{uiLanguage?.collectionPage?.tableElements?.edBtn}</Button>,
                  <Button>{uiLanguage?.collectionPage?.tableElements?.delBtn}</Button>,
                ]
          }
        >
          <div className="topic">Topic</div>
          <Link to={"/collections/6"}>
            <div style={{ fontSize: "20px", textAlign: "center" }}>Some Collection</div>
          </Link>
          <Paragraph style={{ textAlign: "center", marginBottom: 0, fontWeight: 400 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam neque temporibus
            debitis eaque veritatis magnam modi, adipisci distinctio possimus?
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
}
