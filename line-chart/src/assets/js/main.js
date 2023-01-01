import { scaleTime, scaleLinear, timeFormat, extent } from "d3";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 70, left: 150 };

const xAxisLabelOffset = 60;
const yAxisLabelOffset = 60;

const xAxisTickFormat = timeFormat("%a")


const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>Loading...</pre>;
  }

  //console.log(data[0]);
  const xValue = (d) => d.timestamp;
  const xAxisLabel = 'Time';

  const yValue = (d) => d.temperature;
  const yAxisLabel = 'Temperature';
  
  const xScale = scaleTime()
  .domain(extent(data, xValue))
  .range([0, innerWidth])
  .nice();
  
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
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
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={3}
        />
      </g>
    </svg>
  );
};

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
