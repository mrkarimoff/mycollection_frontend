import { Button, Card, Col, Row } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLanguage } from "../redux/users/users.selectors";

export default function CollectionsLayout({ data }) {
  const pathname = window.location.pathname;
  const uiLanguage = useSelector(getLanguage());
  return (
    <Row style={{ gap: "15px", justifyContent: "center", alignItems: "center" }}>
      {data?.map((collection) => (
        <Col key={collection._id}>
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
                    <Button onClick={() => console.log(collection._id)}>
                      {uiLanguage?.collectionPage?.tableElements?.delBtn}
                    </Button>,
                  ]
            }
          >
            <div className="topic">{collection?.topic}</div>
            <Link to={`/collections/${collection?._id}`}>
              {collection?.collectionImg && (
                <div
                  style={{ backgroundImage: `url(${collection?.collectionImg})` }}
                  className="collectionPic"
                />
              )}
              <div style={{ fontSize: "20px", textAlign: "center" }}>
                {collection?.collectionName}
              </div>
            </Link>
            <div style={{ textAlign: "center", marginBottom: 0 }}>
              <ReactMarkdown>{collection?.description}</ReactMarkdown>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
