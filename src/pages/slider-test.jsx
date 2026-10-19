import Head from "next/head";
import SliderTest from "../components/slider-test";

const SliderTestPage = () => {
  return (
    <div className="">
      <Head>
        <title>Slider Test | Be Fair Right Now</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <div className="h-full">
        <SliderTest />
      </div>
    </div>
  );
};

export default SliderTestPage;
