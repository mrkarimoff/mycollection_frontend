import { ConfigProvider, theme } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainHeader from "../components/MainHeader";
import { getTheme } from "../redux/users/users.selectors";
import MainBody from "../components/MainBody";

const Home = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const isDarkTheme = useSelector(getTheme());

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div>
        <MainHeader />
        <MainBody isDarkTheme={isDarkTheme} />
      </div>
    </ConfigProvider>
  );
};

export default Home;
