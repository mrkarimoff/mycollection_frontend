import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeCurrentCollection,
  deleteCollection,
} from "../redux/collections/collections.reducer";
import { getLanguage } from "../redux/users/users.selectors";

export default function CollectionsLayout({ data, form, setOpen, setFields }) {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const uiLanguage = useSelector(getLanguage());
  const [modal, contextHolder] = Modal.useModal();

  const deleteCol = (payload) => {
    modal.confirm({
      title: "Do you really want to delete this collection?",
      icon: <ExclamationCircleFilled />,
      content: "If you delete it, all items in it will be deleted as well!",
      onOk() {
        dispatch(deleteCollection(payload));
      },
    });
  };

  const editCol = (collection) => {
    dispatch(
      changeCurrentCollection({ id: collection?._id, imgName: collection?.collectionImg?.imgName })
    );
    const { collectionImg, collectionName, description, topic } = collection;
    const nameLessCustomFields = collection?.customFields?.map((field) => ({
      field_id: field.field_id,
      invalid: field.invalid,
      label: field.label,
      type: field.type,
    }));

    setFields(nameLessCustomFields);
    form.setFieldsValue({ collectionImg, collectionName, description, topic });
    setOpen(true);
  };

  return (
    <Row style={{ gap: "15px", justifyContent: "center", alignItems: "center" }}>
      {contextHolder}
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
                    <Button onClick={() => editCol(collection)}>
                      {uiLanguage?.collectionPage?.tableElements?.edBtn}
                    </Button>,
                    <Button
                      onClick={() =>
                        deleteCol({
                          colId: collection?._id,
                          imgData: collection?.collectionImg,
                          urlParams: pathname.split("/").at(-1),
                        })
                      }
                    >
                      {uiLanguage?.collectionPage?.tableElements?.delBtn}
                    </Button>,
                  ]
            }
          >
            <div className="topic">{collection?.topic}</div>
            <Link to={`/collections/${collection?._id}`}>
              {collection?.collectionImg?.imgUrl && (
                <div
                  style={{ backgroundImage: `url(${collection?.collectionImg?.imgUrl})` }}
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
