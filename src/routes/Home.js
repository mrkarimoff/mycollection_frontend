import { ConfigProvider, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CollectionsLayout from "../components/CollectionsLayout";
import MainHeader from "../components/MainHeader";
import TagsCarousel from "../components/TagsCarousel";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import MainItems from "../components/MainItems";
import Wrapper from "../components/Wrapper";

const Home = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const dummyTags = [
    "hello",
    "salom",
    "lorem",
    "damn",
    "Thanks",
    "damn all",
    "blood",
    "tag2",
    "tag3",
    "tag4",
    "Lorem, ipsum dolor.",
  ];

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <MainHeader />
        <Wrapper>
          <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
            {uiLanguage?.mainPage?.section1}
          </Title>
          <TagsCarousel data={dummyTags} />

          <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
            {uiLanguage?.mainPage?.section2}
          </Title>
          <CollectionsLayout />

          <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
            {uiLanguage?.mainPage?.section3}
          </Title>
          <MainItems />
        </Wrapper>
      </div>
    </ConfigProvider>
  );
};

export default Home;
