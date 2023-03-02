import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Card, Col, ConfigProvider, Space, Tag, Typography, message, theme } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import MainHeader from "../components/MainHeader";
import Wrapper from "../components/Wrapper";
import { getSingleItem, updateLikes } from "../redux/items/items.reducer";
import {
  getCommentCount,
  getCommentEntities,
  getItemLikes,
  getSingleItemEntities,
  getSingleItemLoading,
} from "../redux/items/items.selectors";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import ReactMarkdown from "react-markdown";
import { getLocalRole, getLocalToken, getLocalUsername } from "../utils/localStorage.service";
import CommentSection from "../components/CommentSection";

const Item = () => {
  const itemId = window.location.pathname.split("/").at(-1);
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const commentCount = useSelector(getCommentCount());
  const comments = useSelector(getCommentEntities());
  const username = getLocalUsername();
  const role = getLocalRole();
  const token = getLocalToken();
  const singleItemLoading = useSelector(getSingleItemLoading());
  const singleItemEntities = useSelector(getSingleItemEntities());
  const itemLikes = useSelector(getItemLikes());
  const dispatch = useDispatch();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { Title } = Typography;

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    dispatch(getSingleItem(itemId));
  }, []);

  const handleLike = () => {
    if (username && role && token) {
      dispatch(updateLikes(itemId));
    } else {
      message.warning(uiLanguage?.authMessages?.warning);
    }
  };

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
      {singleItemLoading ? (
        <Loader />
      ) : (
        <Wrapper style={{ marginTop: "50px", marginBottom: "15px" }}>
          <Wrapper style={{ display: "flex", justifyContent: "center" }}>
            <Card
              loading={false}
              style={{ cursor: "default" }}
              hoverable
              actions={[
                <Button onClick={handleLike} type="dashed" icon={<LikeOutlined key="like" />}>
                  <span>{itemLikes.length > 0 && itemLikes.length}</span>
                </Button>,
                <Button
                  style={{ outline: 0, cursor: "default" }}
                  type="ghost"
                  icon={<MessageOutlined key="comment" />}
                >
                  <span>{commentCount}</span>
                </Button>,
              ]}
            >
              <Title style={{ textAlign: "center" }} level={2}>
                {singleItemEntities?.find((entity) => entity.label === "itemName")?.value}
              </Title>
              <Space direction="vertical" size="middle" id="itemSpace">
                {singleItemEntities
                  ?.filter((entity) => entity.label !== "itemName")
                  .map((entity) => (
                    <div id="row" key={entity.label}>
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
                          {entity.label}
                        </span>
                      </Col>
                      <Col>
                        {entity.label === "tags" ? (
                          entity.value?.map((tag, i) => (
                            <Tag color="#722ED1" style={{ marginBlock: "3px" }} key={i}>
                              {tag}
                            </Tag>
                          ))
                        ) : entity.value === true ? (
                          <Tag color="green">
                            {uiLanguage?.validateMessages === "eng" ? "True" : "Истинный"}
                          </Tag>
                        ) : entity.value === false ? (
                          <Tag color="red">
                            {uiLanguage?.validateMessages === "eng" ? "False" : "Ложный"}
                          </Tag>
                        ) : entity.type === "textarea" ? (
                          <ReactMarkdown>{entity.value}</ReactMarkdown>
                        ) : (
                          <p style={{ margin: "0", fontWeight: "600" }}>{entity.value ?? "--"}</p>
                        )}
                      </Col>
                    </div>
                  ))}
              </Space>
            </Card>
          </Wrapper>
          <CommentSection comments={comments} itemId={itemId} />
        </Wrapper>
      )}
    </ConfigProvider>
  );
};

export default Item;
