import { geoNaturalEarth1, geoPath, geoGraticule } from "d3-geo";
import { useMemo } from "react";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  cities,
  sizeScale,
  sizeValue,
}) => (
  <g className="marks">
    {useMemo(
      () => (
        <>
          <path className="sphere" d={path({ type: "Sphere" })} />
          <path className="graticules" d={path(graticule())} />
          {land.features.map((feature) => (
            <path className="land" d={path(feature)} />
          ))}
          <path className="interiors" d={path(interiors)} />
        </>
      ),
      [path, graticule, land, interiors]
    )}
    {cities.map((d) => {
      const [x, y] = projection([d.lng, d.lat]);

      if (!isNaN(x) || !isNaN(y)) {
        return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      }
    })}
  </g>
);
