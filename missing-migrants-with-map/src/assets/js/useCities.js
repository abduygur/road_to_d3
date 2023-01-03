import { useState, useEffect } from "react";
import { dsv, csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/abduygur/2123c858d63812fb9567938c27f972b0/raw/f7d65e9b3e11c2ced2ae6ffe5147465a0b980f56/migrantData.csv";
  
export const useCities = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      
      const row = (d) => {
        d['Total Number of Dead and Missing'] = +d['Total Number of Dead and Missing'];
        d['Website Date'] = new Date(d['Website Date']);
        
        if (d.Coordinates !== ""){
          d.Coordinates = d['Coordinates'].match(/\(([^\)]+)\)/)[1].replace(" ",", ")
          d.lat = parseFloat(d.Coordinates.split(", ")[1])
          d.lng = parseFloat(d.Coordinates.split(", ")[0])
        }
        return {
           lat: d.lat,
           lng: d.lng,
          'Website Date': d['Website Date'],
          'Total Number of Dead and Missing': d['Total Number of Dead and Missing'],
        };
      };
      csv(csvUrl, row).then(setData);
    }, []);
    return data
}
