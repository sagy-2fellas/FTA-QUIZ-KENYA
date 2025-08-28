import ReactSlider from "react-slider";

const Slider = ({ currentValue, setCurrentValue }) => {
  return (
    <ReactSlider
      className="customSlider"
      trackClassName="customSlider-track"
      thumbClassName="customSlider-thumb"
      markClassName="customSlider-mark"
      orientation="horizontal"
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
