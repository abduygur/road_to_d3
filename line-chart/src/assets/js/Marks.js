import { curveNatural, line } from "d3"

export const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius}) =>  (
  <g className="marks">
<path 
  fill="none"
  stroke="blue"
  d={line()
  .x(d => xScale(xValue(d)))
  .y(d => yScale(yValue(d)))
  .curve(curveNatural)(data)
  }
  strokeLinecap="round"
  strokeLinejoin="round" />
{
data.map(d => {
  
  // console.log(xValue(d))
  // console.log(yValue(d))
  return (
  <circle
  cx={xScale(xValue(d))}
  cy={yScale(yValue(d))}
  r={circleRadius}
>
    <title>{tooltipFormat(xValue(d))}</title>
    </circle>

  )
}
  )
}
  </g>
)