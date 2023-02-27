import { ConfigProvider, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionsLayout from "../components/CollectionsLayout";
import MainHeader from "../components/MainHeader";
import TagsCarousel from "../components/TagsCarousel";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import MainItems from "../components/MainItems";
import Wrapper from "../components/Wrapper";
import { getAllTags, getRecentItems } from "../redux/items/items.reducer";
import { getItemsLoading, getRecentItemsEntities, getTags } from "../redux/items/items.selectors";
import { getBiggestCollections } from "../redux/collections/collections.reducer";
import { getBiggestCollectionEntities } from "../redux/collections/collections.selectors";
import Loader from "../components/Loader";

const Home = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const dispatch = useDispatch();
  const tags = useSelector(getTags());
  const recentItems = useSelector(getRecentItemsEntities());
  const itemsLoading = useSelector(getItemsLoading());
  const biggestCollectionEntities = useSelector(getBiggestCollectionEntities());
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getBiggestCollections());
    dispatch(getRecentItems());
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <MainHeader />
        {itemsLoading ? (
          <Loader />
        ) : (
          <Wrapper>
            <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
              {uiLanguage?.mainPage?.section1}
            </Title>
            <TagsCarousel data={tags} />

            <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
              {uiLanguage?.mainPage?.section2}
            </Title>
            <CollectionsLayout data={biggestCollectionEntities} />

            <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
              {uiLanguage?.mainPage?.section3}
            </Title>
            <MainItems data={recentItems} />
          </Wrapper>
        )}
      </div>
    </ConfigProvider>
  );
};

export default Home;
