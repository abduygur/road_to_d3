import { Marks } from "./Marks";
import { max, scaleSqrt } from "d3";
import React, { useMemo } from "react";

const maxRadius = 10;
const sizeValue = d => d['Total Number of Dead and Missing'];


export const BubbleMap = ({cities, filteredData, worldAtlas}) => {
    
    const sizeScale = useMemo(() => scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]), [cities, sizeValue, maxRadius]);

    return (
    <Marks
        worldAtlas={worldAtlas}
        cities={filteredData}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />);

  }