import { useState, useEffect } from "react";
import { count, json } from "d3";
import { feature, mesh } from "topojson";

const jsonUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
  
export const useWorldAtlas = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      json(jsonUrl).then(topology => {
        const {countries, land} = topology.objects;
        setData({
          land: feature(topology, land),
          interiors: mesh(topology, countries, (a, b) => a !== b)
          })
      });
    }, []);
    return data
}
