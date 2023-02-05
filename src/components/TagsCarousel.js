import { Button } from "antd";
import Title from "antd/es/typography/Title";
import Carousel from "better-react-carousel";

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
  const containerStyle = { paddingBlock: "7px" };
  const responsive = [
    {
      breakpoint: 400,
      cols: 2,
    },
    {
      breakpoint: 560,
      cols: 3,
    },
    {
      breakpoint: 740,
      cols: 4,
    },
    {
      breakpoint: 915,
      cols: 5,
    },
    {
      breakpoint: 1115,
      cols: 6,
    },
  ];
  return (
    <div>
      <Carousel
        hideArrow={data?.length <= 8}
        responsiveLayout={responsive}
        containerStyle={containerStyle}
        mobileBreakpoint={225}
        cols={8}
        rows={1}
        gap={"10px"}
        loop
      >
        {data?.map((item, index) => (
          <Carousel.Item key={index}>
            <Button style={style}>
              <Title level={5}>{item}</Title>
            </Button>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TagsCarousel;
