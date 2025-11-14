import React, { useEffect, useState } from "react";
import styles from "../../style";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

type MapProps = {
  width: number;
  height: number;
};

type Marker = {
  name: string;
  coordinates: [number, number];
};

export const MapSection = ({
  width,
  height,
  handleSelection,
}: MapProps & { handleSelection: (region: string) => void }) => {
  const [data, setData] = useState(null);

  const [selectedId, setSelectedId] = useState<string | number | undefined>();
  const [svgWidth, setSvgWidth] = useState(width);
  const [svgHeight, setSvgHeight] = useState(height);
  const [projectionCenter, setProjectionCenter] = useState<[number, number]>([
    45.5, -1.5,
  ]);

  const updateDimensions = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 321) {
      setSvgWidth(260);
      setSvgHeight(240);
      setProjectionCenter([52, -5]);
    } else if (windowWidth < 620) {
      setSvgWidth(320);
      setSvgHeight(280);
      setProjectionCenter([47, -1]);
    } else if (windowWidth < 1024) {
      setSvgWidth(500);
      setSvgHeight(500);
      setProjectionCenter([41, -0.5]);
    } else if (windowWidth < 1536) {
      setSvgWidth(500);
      setSvgHeight(550);
      setProjectionCenter([42, 1]);
    } else if (windowWidth < 1920) {
      setSvgWidth(550);
      setSvgHeight(600);
      setProjectionCenter([41, 1]);
    } else {
      setSvgWidth(600);
      setSvgHeight(650);
      setProjectionCenter([40, 2]);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Initial call
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const markers: Marker[] = [
    { name: "Nairobi", coordinates: [36.6019, -0.7] },
    { name: "North-Eastern", coordinates: [39.8682, 1.4435] },
    { name: "Eastern", coordinates: [37.6682, 0.6435] },
    { name: "Coast", coordinates: [39.2682, -1.9435] },
    { name: "Central", coordinates: [36.6682, -0.1435] },
    { name: "Rift Valley", coordinates: [35.6682, 1.4435] },
    { name: "Nyanza", coordinates: [34.1679, -0.0917] },
    { name: "Western", coordinates: [34.2679, 0.9917] },
  ];

  useEffect(() => {
    d3.json("data/kenya-4.geojson")
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error loading the data:", error);
      });
  }, []);

  const projection = d3
    .geoMercator()
    .scale(svgWidth / 0.06 / Math.PI)
    .center(projectionCenter);

  const geoPathGenerator = d3.geoPath().projection(projection);

  // Check if data is available before attempting to render
  const allSvgPaths = data?.features.map((shape) => {
    const pathData = geoPathGenerator(shape) ?? "";
    const isSelected = shape.name === selectedId;
    const isSmallRegion = shape.name === "Nairobi" || shape.name === "Western";

    return (
      <React.Fragment key={shape.id}>
        <path
          d={pathData}
          stroke="#f2f2f2"
          strokeWidth={isSmallRegion ? 8 : 2}
          fill={shape.name === selectedId ? "#00B2E2" : "black"}
          onClick={() => {
            const regionName = shape.name; // Assuming `name` holds the region's name
            setSelectedId(regionName);
            handleSelection(regionName); // Pass selected region to parent component
          }}
          style={{
            cursor: 'pointer',
            ...(isSmallRegion && {
              paintOrder: 'stroke',
              strokeLinejoin: 'round',
              strokeLinecap: 'round'
            })
          }}
        />

        {/* Invisible larger hit area for small regions */}
        {isSmallRegion && (
          <path
            d={pathData}
            fill="transparent"
            stroke="transparent"
            strokeWidth={20}
            onClick={() => {
              const regionName = shape.name;
              setSelectedId(regionName);
              handleSelection(regionName);
            }}
            style={{
              cursor: 'pointer',
              pointerEvents: 'stroke'
            }}
          />
        )}
      </React.Fragment>
    );
  });

  const markerElements = markers
    .filter((marker) => marker.name === selectedId)
    .map((marker) => {
      const [x, y] = projection(marker.coordinates) || [0, 0];

      return (
        <motion.g
          key={marker.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          transform={`translate(${x}, ${y})`}
        >
          <FaMapMarkerAlt color="#C1D42F" size={30} />
        </motion.g>
      );
    });

  return (
    <div className={`${styles.boxWidth} max-w-full`}>
      <motion.svg
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.5 }}
        className="cursor-pointer mx-auto"
        width={svgWidth}
        height={svgHeight}
      >
        {allSvgPaths}
        {markerElements}
      </motion.svg>
    </div>
  );
};
