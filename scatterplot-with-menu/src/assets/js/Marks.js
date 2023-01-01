export const Marks = ({data, xScale, yScale, xValue, yValue, colorScale, colorValue, tooltipFormat, circleRadius}) =>  data.map(d => {
  
  // console.log(xValue(d))
  // console.log(yValue(d))
  return (
  <circle
  className="mark"
  cx={xScale(xValue(d))}
  cy={yScale(yValue(d))}
  r={circleRadius}
  fill={colorScale(colorValue(d))}
>
    <title>{tooltipFormat(xValue(d))}</title>
    </circle>

  )
}
  )