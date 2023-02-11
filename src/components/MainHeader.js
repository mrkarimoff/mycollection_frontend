import { Button, Col, Dropdown, Select } from "antd";
import Search from "antd/es/input/Search";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import config from "../config.json";
import { changeLanguage, setDefaultLang, toggleTheme } from "../redux/users/users.reducer";
import { getDefaultLang, getLanguage, getTheme } from "../redux/users/users.selectors";

const MainHeader = () => {
  const dispatch = useDispatch();
  const siteTheme = useSelector(getTheme());
  const uiLanguage = useSelector(getLanguage());
  const defaultLang = useSelector(getDefaultLang());
  const pathName = window.location.pathname;
  const generalPages = ["/login", "/register"];
  const navigate = useNavigate();
  const style = {
    color: "#fff",
    display: "flex",
    padding: "10px",
    paddingInline: "20px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  };
  const items = [
    {
      key: "1",
      label: (
        <Button onClick={() => navigate("/username")} type="ghost">
          {uiLanguage?.mainPage?.myCollectionsBtn}
        </Button>
      ),
    },
    {
      key: "2",
      label: <Button type="ghost">{uiLanguage?.mainPage?.logoutBtn}</Button>,
    },
  ];

  const handleLanguage = (val) => {
    dispatch(changeLanguage(config.UILanguage[val]));
    dispatch(setDefaultLang(val));
  };

  return (
    <Header
      style={{
        backgroundColor: "#0d0d32",
        color: "fff",
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%",
      }}
    >
      <Col style={style} span={24}>
        <Link id="logo" to={"/"}>
          <h2>
            <span style={{ color: "red", fontStyle: "italic" }}>M</span>y
            <span style={{ color: "red", fontStyle: "italic" }}>C</span>
            ollections
          </h2>
        </Link>
        <Link id="logoMobile" to={"/"}>
          <h2>
            <span style={{ color: "red", fontStyle: "italic" }}>M</span>
            <span style={{ color: "red", fontStyle: "italic" }}>C</span>
          </h2>
        </Link>

        <div id="searchBar" style={{ display: generalPages.includes(pathName) && "none" }}>
          <Search
            size="large"
            placeholder={uiLanguage?.mainPage?.searchPlaceholder}
            onSearch={() => console.log("hello")}
            enterButton
          />
        </div>

        <div id="account">
          <Select
            style={{
              width: 70,
            }}
            defaultValue={defaultLang}
            onChange={handleLanguage}
            options={[
              {
                value: "eng",
                label: "Eng",
              },
              {
                value: "rus",
                label: "Ру",
              },
            ]}
          />
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40px",
              width: "55px",
            }}
            onClick={() => dispatch(toggleTheme())}
            type="default"
          >
            <img width={"30px"} src={`/${siteTheme ? "moon" : "sun"}.png`} alt="themeIcon" />
          </Button>
          {/* <Button size="large" onClick={() => navigate("/login")}>
            {uiLanguage?.mainPage?.loginBtn}
          </Button> */}
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <Button style={{ display: generalPages.includes(pathName) && "none" }} size="large">
              {uiLanguage?.mainPage?.myAccountBtn}
            </Button>
          </Dropdown>
        </div>
      </Col>
    </Header>
  );
};
export default MainHeader;
