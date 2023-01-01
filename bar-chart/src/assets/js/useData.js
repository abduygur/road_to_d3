import { useState, useEffect } from "react";
import { dsv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/abduygur/42f20010489f998c1131e2e2ee9a42d3/raw/UN_population_by_age_2022.csv";
  
export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const row = (d) => {
        d.YoungPopulation = parseFloat(d["25"]);
        return d;
      };
      dsv(";", csvUrl, row).then((data) => {
          const filteredData = data.filter(d => {
              if(d["Year"] === "2021"){
                  return d
              }
          })
          console.log("Fetching data...");
          setData(filteredData.slice(0, 10));
      });
    }, []);
    return data
}
