import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { appBg2, appBg3 } from "../constants";

const Home = () => {
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor={appBg3}
        productItems={discoutProducts}
      />
      <Section
        title="New Arrivals"
        bgColor={appBg2}
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor={appBg3} productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
