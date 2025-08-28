import ReactSlider from "react-slider";

const Slider = ({ currentValue, setCurrentValue }) => {
  return (
    <ReactSlider
      className="customSlider w-[150px] xs:w-[200px] h-[40px] sm:!w-[400px]  md2:w-[600px] lg:!w-[850px] lg:h-[100px]"
      trackClassName="customSlider-track-2"
      thumbClassName="customSlider-thumb-2"
      markClassName="customSlider-mark-2"
      marks={[1, 2, 3, 4, 5]}
      min={1}
      max={5}
      defaultValue={3}
      value={currentValue}
      onChange={(value) => setCurrentValue(value)}
    />
  );
};

export default Slider;
