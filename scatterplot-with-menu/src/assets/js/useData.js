import { useState, useEffect } from "react";
import { dsv, csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
  
export const useData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const row = (d) => {
        d.sepal_length = parseFloat(d.sepal_length);
        d.sepal_width = parseFloat(d.sepal_width);
        d.petal_length = parseFloat(d.petal_length);
        d.petal_width = parseFloat(d.petal_width);
        return d;
      };
      csv(csvUrl, row).then(setData);
    }, []);
    return data
}
