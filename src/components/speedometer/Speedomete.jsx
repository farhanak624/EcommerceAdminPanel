import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const CustomSpeedometer = ({ value }) => {
  const customSegments = [
    { value: 0, color: "Yellow" }, // Red color up to value 0
    { value: 50, color: "Yellow" }, // Yellow color up to value 50
    { value: 100, color: "#00FF00" }, // Green color up to value 100
    { value: 150, color: "#0000FF" }, // Blue color up to value 150
  ];
  const textColor = "#AAA";
  return (
    <div className="">
      <ReactSpeedometer
        forceRender={true}
        maxSegmentLabels={5}
        customSegmentStops={[0, value, 100]}
        segmentColors={["rgba(255, 200, 51, 1)", "rgba(240, 244, 255, 1)"]}
        needleColor={"rgba(91, 91, 91, 1)"}
        currentValueText={"Current Value: ${value}"}
        minValue={0}
        maxValue={100}
        value={value}
        textColor={textColor}
        needleHeightRatio={0.4} // Adjust needle height as a ratio (0.6 means 60% of the total height)
        needleTransition={"ease-in-out"} // Specify the transition timing function for the needle
      />
    </div>
  );
};

export default CustomSpeedometer;
