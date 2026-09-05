import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

/**
 * Kenya region picker.
 *
 * Previously this rendered a hard-coded 380px-wide SVG at phone widths (clipped
 * on a 360px screen), fetched a 2 MB GeoJSON with no loading, error or retry
 * affordance, and exposed the regions only as mouse-clickable <path> elements.
 * If the fetch was slow or failed, Question 1 could not be answered at all.
 *
 * Now: a fluid viewBox-based SVG, an explicit loading state, a retry action,
 * and a native select that always offers every region — so the question is
 * answerable by keyboard and TalkBack users, and whether or not the map loads.
 */

const VIEWBOX_WIDTH = 500;
const VIEWBOX_HEIGHT = 540;

// Kept in code, not in the GeoJSON, so the fallback works even if the fetch
// never succeeds.
const REGIONS = [
  "Central",
  "Coast",
  "Eastern",
  "Nairobi",
  "North-Eastern",
  "Nyanza",
  "Rift Valley",
  "Western",
] as const;

const MARKERS: Record<string, [number, number]> = {
  Nairobi: [36.6019, -0.7],
  "North-Eastern": [39.8682, 1.4435],
  Eastern: [37.6682, 0.6435],
  Coast: [39.2682, -1.9435],
  Central: [36.6682, -0.1435],
  "Rift Valley": [35.6682, 1.4435],
  Nyanza: [34.1679, -0.0917],
  Western: [34.2679, 0.9917],
};

const GEOJSON_URL = "/data/kenya-4.min.geojson";

type Status = "loading" | "ready" | "error";

export const MapSection = ({
  handleSelection,
}: {
  width?: number;
  height?: number;
  handleSelection: (region: string) => void;
}) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    d3.json(GEOJSON_URL)
      .then((geo: any) => {
        if (cancelled) return;
        if (!geo || !geo.features || !geo.features.length) {
          throw new Error("empty");
        }
        setData(geo);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const select = useCallback(
    (region: string) => {
      setSelectedId(region);
      handleSelection(region);
    },
    [handleSelection]
  );

  // fitSize derives scale and centre from the data, so the map always fills the
  // viewBox regardless of viewport width. No per-breakpoint magic numbers.
  const geo = useMemo(() => {
    if (!data) return null;
    const projection = d3
      .geoMercator()
      .fitSize([VIEWBOX_WIDTH, VIEWBOX_HEIGHT], data);
    return { path: d3.geoPath().projection(projection), projection };
  }, [data]);

  const shapes = useMemo(() => {
    if (!data || !geo) return null;
    return data.features.map((shape: any) => {
      const d = geo.path(shape) ?? "";
      const isSelected = shape.name === selectedId;
      const isSmallRegion = shape.name === "Nairobi" || shape.name === "Western";

      return (
        <path
          key={shape.id ?? shape.name}
          d={d}
          stroke="#f2f2f2"
          strokeWidth={isSmallRegion ? 8 : 2}
          fill={isSelected ? "#00B2E2" : "black"}
          onClick={() => select(shape.name)}
          className="cursor-pointer"
          style={
            isSmallRegion
              ? {
                  paintOrder: "stroke",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                }
              : undefined
          }
        >
          <title>{shape.name}</title>
        </path>
      );
    });
  }, [data, geo, selectedId, select]);

  const marker = useMemo(() => {
    if (!geo || !selectedId || !MARKERS[selectedId]) return null;
    const point = geo.projection(MARKERS[selectedId]);
    if (!point) return null;
    return (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        transform={`translate(${point[0]}, ${point[1]})`}
        aria-hidden="true"
      >
        <FaMapMarkerAlt color="#C1D42F" size={30} />
      </motion.g>
    );
  }, [geo, selectedId]);

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div
        className="relative w-full"
        style={{ aspectRatio: VIEWBOX_WIDTH + " / " + VIEWBOX_HEIGHT }}
      >
        {status === "loading" && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 flex items-center justify-center font-exo text-base text-black"
          >
            Loading regions…
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center"
          >
            <p className="font-exo text-base">
              The map could not be loaded. You can still choose your region
              below.
            </p>
            <button
              type="button"
              onClick={() => setAttempt((n) => n + 1)}
              className="bg-ft-dark-green text-white rounded-md font-exo text-base px-6 min-h-[44px] touch-manipulation"
            >
              Retry loading the map
            </button>
          </div>
        )}

        {status === "ready" && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="quiz-map absolute inset-0 w-full h-full"
            viewBox={"0 0 " + VIEWBOX_WIDTH + " " + VIEWBOX_HEIGHT}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Map of Kenya. Use the region list below to choose your region."
          >
            {shapes}
            {marker}
          </motion.svg>
        )}
      </div>

      {/* Always present: the map alone is not operable by keyboard or TalkBack,
          and this is also the fallback when the GeoJSON fails to load. */}
      <div className="mt-3 px-2">
        <label
          htmlFor="kenya-region"
          className="block font-exo text-sm mb-1 text-black"
        >
          Where do you live?
        </label>
        <select
          id="kenya-region"
          name="kenya-region"
          value={selectedId ?? ""}
          onChange={(event) => {
            if (event.target.value) select(event.target.value);
          }}
          className="w-full min-h-[44px] rounded-md border border-black bg-white px-3 font-exo text-base text-gray-900 touch-manipulation"
        >
          <option value="" disabled>
            Choose your region…
          </option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
