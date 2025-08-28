import { useState, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const SliderTest = () => {
  const min = 0;
  const max = 6;
  const allowedValues = [0, 3, 6];
  const [value, setValue] = useState(3);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleSize = 24;
  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const background = useMotionTemplate`linear-gradient(90deg, #000000 ${progress}px, #d1d5db 0)`;

  function handleDrag() {
    let handleBounds = handleRef.current.getBoundingClientRect();
    let middleOfHandle = handleBounds.x + handleBounds.width / 2;
    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    let newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;
    setValue(newProgress * (max - min));
  }

  function handleDragEnd() {
    // Snap to the nearest allowed value when dragging ends
    snapToClosestValue(value);
  }

  function snapToClosestValue(currentValue) {
    const closestValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
        ? curr
        : prev;
    });

    setValue(closestValue);
    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const newProgress = (closestValue / (max - min)) * progressBarBounds.width;

    animate(handleX, newProgress);
  }

  useEffect(() => {
    const updateInitialPosition = () => {
      let newProgress = value / (max - min);
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleX.set(newProgress * progressBarBounds.width);
    };

    // Delay setting the initial position until layout is fully measured
    setTimeout(updateInitialPosition, 0);
  }, [handleX, min, max, value]);

  const displayedValue = () => {
    if (value === 0) return "hey how are you";
    if (value === 3) return "hey how are you 2";
    if (value === 6) return "hey how are you 3";
    return Math.floor(value); // Default case (if needed)
  };

  return (
    <div className="p-8 w-full">
      <div data-test="slider" className="relative flex flex-col justify-center">
        <motion.div
          data-test="slider-background"
          className="absolute w-full h-2 rounded-full"
          style={{
            background,
          }}
        />

        {/* Indicators with values */}
        <div className="absolute w-full px-2">
          <div className="flex justify-between">
            <span className="h-10 w-2 bg-blue-500"></span>
            <span className="h-10 w-2 bg-blue-500"></span>
            <span className="h-10 w-2 bg-blue-500"></span>
          </div>
        </div>
        <div
          data-test="slider-progress"
          ref={progressBarRef}
          className="absolute"
          style={{
            left: handleSize / 2,
            right: handleSize / 2,
          }}
        />
        <div ref={constraintsRef}>
          <motion.div
            data-test="slider-handle"
            ref={handleRef}
            className="relative z-10 bg-red-500 rounded-full "
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => {
              setDragging(false);
              handleDragEnd(); // Call snapping function
            }}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            animate={{
              scale: dragging ? 2 : 1,
            }}
            style={{
              width: handleSize,
              height: handleSize,
              x: handleX,
            }}
          />
        </div>
        <div
          data-test="slider-clickable-area"
          className="absolute w-full h-4 "
          onPointerDown={(event) => {
            let { left, width } =
              progressBarRef.current.getBoundingClientRect();
            let position = event.pageX - left;
            let newProgress = clamp(position / width, 0, 1);
            let newValue = newProgress * (max - min);
            snapToClosestValue(newValue); // Snap to the closest value
          }}
        />
      </div>

      {!dragging && <div className="text-black">{displayedValue()}</div>}
    </div>
  );
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default SliderTest;
