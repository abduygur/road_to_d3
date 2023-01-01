import { scaleLinear, format, extent, scaleOrdinal } from "d3";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ColorLegend } from "./ColorLegend";

const width = 960;
const menuHeight = 82;
const height = 500 - menuHeight;
const margin = { top: 20, right: 200, bottom: 70, left: 150 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 60;

const xAxisTickFormat = format(".2s");

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const attributes = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" },
];

const getLabel = (value) => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null); 


  const initialXAttribute = "petal_length";
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = "sepal_width";
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const yValue = (d) => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = (d) => d.species;
  const colorLegendLabel = "Species";

  
  if (!data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = data.filter(d => hoveredValue === colorValue(d))

 


  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);


  

  return (
    <>
      <div className="menuArea">
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={attributes}
          value={xAttribute}
          onChange={(option) => setXAttribute(option.value)}
        />

        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={attributes}
          value={yAttribute}
          onChange={(option) => setYAttribute(option.value)}
        />
      </div>
      <div className="chart-area">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
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
            <g
              className="tick"
              transform={`translate(${innerWidth + 50}, ${innerHeight / 2})`}
            >
              <text x={35} y={-20} className="axis-label" textAnchor="middle">
                {colorLegendLabel}
              </text>
              <ColorLegend colorScale={colorScale} onHover={setHoveredValue} />
            </g>

            <g className="data-all" opacity={hoveredValue?0.2:1}>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={7}
            />
            </g>
                        <Marks
              data={filteredData}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={7}
            />
          </g>
        </svg>
      </div>
    </>
  );
};

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
