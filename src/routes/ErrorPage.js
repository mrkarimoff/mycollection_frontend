import { useNavigate, useRouteError } from "react-router-dom";
import { Button, ConfigProvider, Result, theme } from "antd";
import { useEffect } from "react";
import { getLanguage, getTheme } from "../redux/users/users.selectors";
import { useSelector } from "react-redux";
import Title from "antd/es/typography/Title";

export default function ErrorPage() {
  const navigate = useNavigate();
  const isDarkTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const error = useRouteError();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? "#444" : "#e2e8f0";
  }, [isDarkTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#2f54eb",
        },
      }}
    >
      {error.status === 404 ? (
        <Result
          status="404"
          title={<Title level={2}>404</Title>}
          subTitle={<Title level={4}>{uiLanguage?.msg404?.msg}</Title>}
          extra={
            <Button onClick={() => navigate("/")} type="primary">
              {uiLanguage?.msg404?.btn}
            </Button>
          }
        />
      ) : (
        <div style={{ padding: "15px" }} id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      )}
    </ConfigProvider>
  );
}
