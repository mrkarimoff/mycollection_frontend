import { ConfigProvider, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionsLayout from "../components/CollectionsLayout";
import Loader from "../components/Loader";
import MainHeader from "../components/MainHeader";
import MainItems from "../components/MainItems";
import Wrapper from "../components/Wrapper";
import { search } from "../redux/search/search.reducer";
import {
  getResultsLoading,
  getSearchResult,
  getSearchValue,
} from "../redux/search/search.selectors";
import { getLanguage, getTheme } from "../redux/users/users.selectors";

const SearchResult = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const searchValue = useSelector(getSearchValue());
  const searchResult = useSelector(getSearchResult());
  const resultsLoading = useSelector(getResultsLoading());
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  useEffect(() => {
    if (searchValue) {
      dispatch(search(searchValue));
    }
  }, [searchValue]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#fa541c",
        },
      }}
    >
      <MainHeader />
      {resultsLoading ? (
        <Loader />
      ) : (
        <Wrapper style={{ marginBlock: "20px" }}>
          {searchResult?.collections?.length > 0 || searchResult?.items?.length > 0 ? (
            <div>
              {searchResult?.collections?.length > 0 && (
                <div id="found-collections">
                  <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
                    {uiLanguage?.searchPage?.foundCols}
                  </Title>
                  <CollectionsLayout data={searchResult?.collections} />
                </div>
              )}

              {searchResult?.items?.length > 0 && (
                <div id="found-items">
                  <Title level={2} style={{ textAlign: "center", marginBlock: "20px" }}>
                    {uiLanguage?.searchPage?.foundItems}
                  </Title>
                  <MainItems data={searchResult?.items} />
                </div>
              )}
            </div>
          ) : (
            <div className="noResult">
              <Title level={3}>{uiLanguage?.searchPage?.noResult}</Title>
              <img className="noResult-img" src="/no-result.png" alt="noResult" />
            </div>
          )}
        </Wrapper>
      )}
    </ConfigProvider>
  );
};

export default SearchResult;
