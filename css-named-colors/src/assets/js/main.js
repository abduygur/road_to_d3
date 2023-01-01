import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { arc, pie} from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/abduygur/7d353c52b2e381af146b5230abd088e4/raw/cssNamedColors.csv";


const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
    .innerRadius(0)
    .outerRadius(width);   

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.dsv(";", csvUrl).then((data) => {
      console.log("Fetching the data");
      setData(data);
    });
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
        {
            pie().value(1)(data).map(d => (
                <path fill={d.data['RGB hex value']}
                d={pieArc(d)}
                />
            ))
            // data.map((d, i) => (
            //     <path fill={d['RGB hex value']} d={pieArc({
            //         startAngle: i / data.length * 2 * Math.PI,
            //         endAngle:(i + 1)  / data.length * 2 * Math.PI
            //     })} />
            // ))
        }
        </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
