import { Button, Col, Dropdown } from "antd";
import Search from "antd/es/input/Search";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/users/users.reducer";
import { getTheme } from "../redux/users/users.selectors";

const MainHeader = () => {
  const dispatch = useDispatch();
  const siteTheme = useSelector(getTheme());
  const pathName = window.location.pathname;
  const generalPages = ["/login", "/register"];
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
      label: <Button type="ghost">My collections</Button>,
    },
    {
      key: "2",
      label: <Button type="ghost">Log out</Button>,
    },
  ];

  return (
    <Header
      style={{
        backgroundColor: "#0d0d32",
        color: "fff",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <Col style={style} span={24}>
        <h2 id="logo">
          <span style={{ color: "red", fontStyle: "italic" }}>M</span>y
          <span style={{ color: "red", fontStyle: "italic" }}>C</span>
          ollections
        </h2>
        <h2 id="logoMobile">
          <span style={{ color: "red", fontStyle: "italic" }}>M</span>
          <span style={{ color: "red", fontStyle: "italic" }}>C</span>
        </h2>

        <div id="searchBar" style={{ display: generalPages.includes(pathName) && "none" }}>
          <Search
            size="large"
            placeholder="Search through site"
            onSearch={() => console.log("hello")}
            enterButton
          />
        </div>

        <div id="account">
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
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <Button style={{ display: generalPages.includes(pathName) && "none" }} size="large">
              Account
            </Button>
          </Dropdown>
        </div>
      </Col>
    </Header>
  );
};
export default MainHeader;
