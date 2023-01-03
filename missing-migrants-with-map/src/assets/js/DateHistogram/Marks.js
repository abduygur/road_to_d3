export const Marks = ({
    binnedData,
    xScale,
    yScale,
    tooltipFormat,
    innerHeight,
  }) => (
    <g className="marks">
      {binnedData.map((d) => {
        // console.log(xScale(d.x1) - xScale(d.x0))
        // console.log(innerHeigth - yScale(d.y))
        return (
          <rect
            x={xScale(d.x0)}
            y={yScale(d.y)}
            width={xScale(d.x1) - xScale(d.x0)}
            height={innerHeight - yScale(d.y)}
          >
            <title>{tooltipFormat(d.y)}</title>
          </rect>
        );
      })}
    </g>
  );