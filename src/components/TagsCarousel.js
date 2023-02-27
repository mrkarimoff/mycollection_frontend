import { Button, Tag } from "antd";
import Title from "antd/es/typography/Title";
import Carousel from "better-react-carousel";
import { updateSearchValue } from "../redux/search/search.reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  height: "35px",
  justifyContent: "center",
  borderRadius: "15px",
  paddingInline: "60px",
  fontSize: "16px",
  color: "#000",
  fontWeight: "500",
};

const TagsCarousel = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerStyle = { paddingBlock: "7px" };
  const responsive = [
    {
      breakpoint: 400,
      cols: 2,
    },
    {
      breakpoint: 560,
      cols: 2,
    },
    {
      breakpoint: 850,
      cols: 3,
    },
    {
      breakpoint: 915,
      cols: 3,
    },
    {
      breakpoint: 1115,
      cols: 4,
    },
  ];
  return (
    <div>
      <Carousel
        hideArrow={data?.length <= 8}
        responsiveLayout={responsive}
        containerStyle={containerStyle}
        mobileBreakpoint={225}
        cols={5}
        rows={1}
        gap={"10px"}
        loop
      >
        {data?.map((item) => (
          <Carousel.Item key={item._id}>
            <Button
              onClick={() => {
                navigate("/search-page");
                dispatch(updateSearchValue(item.name));
              }}
              type="dashed"
              style={style}
            >
              <Title level={5}>{item.name}</Title>
            </Button>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TagsCarousel;
