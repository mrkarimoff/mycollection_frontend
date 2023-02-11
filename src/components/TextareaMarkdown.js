import { Form, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const TextareaMarkdown = ({
  label,
  name,
  rules,
  placeholder,
  tab1,
  tab2,
  markdownText,
  setMarkdownText,
}) => {
  function grabText(e) {
    setMarkdownText(e.target.value);
  }

  const items = [
    {
      key: "1",
      label: tab1,
      children: (
        <Form.Item label={label} name={name} rules={rules}>
          <TextArea onChange={grabText} placeholder={placeholder} />
        </Form.Item>
      ),
    },
    {
      key: "2",
      label: tab2,
      children: (
        <div style={{ paddingInline: "20px" }}>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};
export default TextareaMarkdown;
