import { scaleBand, scaleLinear, max, format } from "d3";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 300 };
const xAxisLabelOffset = 60;
const xAxisTickFormat = format(".2s")

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const yValue = (d) => d.Country;
  const xValue = (d) => d.YoungPopulation;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Population at Age 25
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
