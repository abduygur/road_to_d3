export const ColorLegend = ({
  colorScale,
  tickSpacing = 30,
  tickSize = 10,
  tickTextOffset = 20,
  onHover,
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}
      transform={`translate(0, ${i * tickSpacing})`}
    >
      <circle fill={colorScale(domainValue)} r={tickSize} />
      <text x={tickTextOffset} dy=".32em">
        {domainValue}
      </text>
    </g>
  ));
