import ReactDOM from "react-dom";
import { useCities } from "./useCities";
import { BubbleMap } from "./BubbleMap";
import { useWorldAtlas } from "./useWorldAtlas";
import {DateHistogram} from './DateHistogram'
import { useState } from "react";


const width = 1024;
const height = 768;
const dateHistogramSize = 0.3;

const xValue = (d) => d["Website Date"];

const App = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities();
  const [brushExtent, setBrushExtent] = useState();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent ? cities.filter(d => {
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1];
  }) : cities;

  return (
    <svg width={width} height={height}>
      <BubbleMap cities={cities} filteredData={filteredData} worldAtlas={worldAtlas} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
      <DateHistogram cities={cities} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}/>
      </g>
      
    </svg>
  );
};

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
