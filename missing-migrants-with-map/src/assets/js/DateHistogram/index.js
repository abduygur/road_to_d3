import {
  scaleTime,
  scaleLinear,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  max,
  brushX,
  select,
} from "d3";

import { useRef, useEffect, useMemo } from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 0, right: 20, bottom: 20, left: 20 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;

const xAxisLabel = "Time";

const yValue = (d) => d["Total Number of Dead and Missing"];
const yAxisLabel = "Total Number of Dead and Missing";

const xAxisTickFormat = timeFormat("%Y-%m-%d");

export const DateHistogram = ({
  cities,
  width,
  height,
  setBrushExtent,
  xValue,
}) => {
  const brushRef = useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleTime().domain(extent(cities, xValue)).range([0, innerWidth]).nice(),
    [cities, xValue, innerWidth]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();

    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(cities)
      .map((array) => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1,
      }));
  }, [xValue, yValue, xScale, cities]);

  const yScale = useMemo(() => scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice(), [binnedData, innerHeight]
  );

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush", (d) => {
      setBrushExtent(d.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);

  return (
    <>
      <rect width={width} height={height} fill="white" />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
          textAnchor="middle"
        >
          {yAxisLabel}
        </text>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={(d) => d}
          innerHeight={innerHeight}
        />
        <g ref={brushRef}></g>
      </g>
    </>
  );
};
