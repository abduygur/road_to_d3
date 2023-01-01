//import { scaleTime, scaleLinear, timeFormat, extent } from "d3";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { Marks } from "./Marks";

const width = 960;
const height = 500;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <Marks
        data={data}
      />
    </svg>
  );
};

// const root = document.querySelector("#root");
// ReactDOM.render(<App />, root);

const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
