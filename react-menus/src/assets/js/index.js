import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Dropdown } from "./Dropdown";



const options = [
  { value: "goldfish", label: "Gold Fish" },
  { value: "dog", label: "Dog" },
  { value: "hamster", label: "Hamster" },
  { value: "parrot", label: "Parrot" },
  { value: "spider", label: "Spider" },
];
const initialValue = "hamster";

const App = () => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  console.log(selectedValue);
  return (
    <div>
      <label for="pet-select">Choose a pet:</label>
      <Dropdown
        options={options}
        id="pet-select"
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
      />
    </div>
  );
};
const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
