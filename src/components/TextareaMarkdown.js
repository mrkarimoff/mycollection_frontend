import { Form, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const TextareaMarkdown = ({ label, name, rules, placeholder, tab1, tab2, form }) => {
  const [markdownText, setMarkdownText] = useState("");
  const getValue = (e) => {
    setMarkdownText(e.target.value);
  };

  useEffect(() => {
    setMarkdownText(form.getFieldValue(name));
  }, [form.getFieldValue(name)]);

  const items = [
    {
      key: "1",
      label: tab1,
      children: (
        <Form.Item label={label} name={name} rules={rules}>
          <TextArea onChange={getValue} placeholder={placeholder} />
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
