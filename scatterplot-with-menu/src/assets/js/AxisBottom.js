

export const AxisBottom = ({xScale, innerHeight}) => 
    xScale.ticks().map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight}/>
      <text
        dy=".90em"
        style={{ textAnchor: "middle" }}
        y={innerHeight + 5}
      >
        {tickValue}
      </text>
    </g>
  ));