import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Empty, List, Typography, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import config from "../config.json";
import { getComments, sendComment, updateCommentCount } from "../redux/items/items.reducer";
import { getCommentAuthor } from "../redux/items/items.selectors";
import { getLanguage } from "../redux/users/users.selectors";
import { getLocalUsername } from "../utils/localStorage.service";

const CommentSection = ({ itemId, comments }) => {
  const ID = uuid();
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const username = getLocalUsername();
  const scrollRef = useRef();
  const uiLanguage = useSelector(getLanguage());
  const [text, setText] = useState("");
  const socket = useRef();
  const commentAuthor = useSelector(getCommentAuthor());
  const [status, setStatus] = useState("");
  const [arrivalComment, setArrivalComment] = useState("");
  const [commentData, setCommentData] = useState([]);

  const handleSend = () => {
    if (text && username) {
      dispatch(sendComment({ itemId, text }));
      setText("");
      const newComment = {
        _id: ID,
        username,
        comment: text,
        userId: commentAuthor,
        date: new Date(),
        fromSocket: true,
      };

      socket.current.emit("sendComment", { newComment, itemId });
    } else {
      message.warning(uiLanguage?.authMessages?.warning);
      setStatus("error");
    }
  };

  useEffect(() => {
    socket.current = io(config.socketServerUrl);
    dispatch(getComments(itemId));
    socket.current.on("getComment", (data) => {
      if (data.itemId === itemId) {
        setArrivalComment({ ...data.newComment });
      }
    });
  }, []);

  useEffect(() => {
    setCommentData((prev) => [...prev, arrivalComment]);
  }, [arrivalComment]);

  useEffect(() => {
    dispatch(updateCommentCount(commentData?.length));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentData]);

  useEffect(() => {
    setCommentData(comments);
  }, [comments]);

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{ marginBlock: "20px", cursor: "default" }}
      actions={[
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingInline: "15px",
              cursor: "default",
            }}
          >
            <div>
              <Avatar>{username?.charAt(0)}</Avatar>
            </div>
            <TextArea
              status={status}
              onChange={(e) => {
                setText(e.target.value);
                setStatus(e.target.value === "" ? "error" : "success");
              }}
              value={text}
              placeholder={uiLanguage?.commentSection?.placeholder}
              autoSize
            />
            <Button onClick={handleSend} shape="circle" icon={<SendOutlined />} type="primary" />
          </div>
          {status === "error" && (
            <p
              style={{
                textAlign: "left",
                paddingInline: "60px",
                color: "#FF4D4F",
                cursor: "default",
              }}
            >
              {uiLanguage?.commentSection?.validationMsg}
            </p>
          )}
        </div>,
      ]}
      title={
        <Title style={{ margin: 0 }} level={4}>
          {uiLanguage?.commentSection?.title}
        </Title>
      }
    >
      <List
        locale={{ emptyText: <Empty description={uiLanguage?.commentSection?.noComment} /> }}
        style={{ maxHeight: "350px", overflow: "auto" }}
        itemLayout="horizontal"
        dataSource={commentData}
        renderItem={(comment) => (
          <List.Item ref={scrollRef} key={comment?._id}>
            <List.Item.Meta
              avatar={<Avatar>{comment?.username?.charAt(0)}</Avatar>}
              title={
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <p style={{ fontSize: "16px", minWidth: "100px" }}>{comment?.username}</p>
                  </div>
                  <ReactTimeAgo
                    style={{ fontSize: "12px", color: "gray", minWidth: "100px", margin: 0 }}
                    date={new Date(comment?.date)}
                    locale={uiLanguage?.commentSection?.timeLang}
                  />
                </div>
              }
              description={
                <Text style={{ maxWidth: "400px", minWidth: "300px" }}>{comment?.comment}</Text>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
export default CommentSection;
