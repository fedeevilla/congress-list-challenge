import React, { useState } from "react";
import * as R from "ramda";
import "./search.styles.scss";

const houseCongress = R.range(102, 117);
const senateCongress = R.range(80, 117);

const Search = ({ setFilter, setFields, setType, setNumber }) => {
  const [chamber, setChamber] = useState("senate");

  const handleChange = (ev) => {
    setFilter(ev.target.value);
  };

  const handleSelect = (ev) => {
    setFields(ev.target.value);
  };

  const handleSelectChamber = (ev) => {
    setType(ev.target.value);
    setChamber(ev.target.value);
  };

  const handleSelectCongress = (ev) => {
    setNumber(ev.target.value);
  };

  return (
    <div className="filters">
      <select
        className="select"
        name="fields"
        onChange={handleSelectChamber}
        defaultValue="senate"
      >
        <option value="senate">Chamber #Senate</option>
        <option value="house">Chamber #House</option>
      </select>
      <select className="select" name="fields" onChange={handleSelectCongress}>
        {R.reverse(chamber === "house" ? houseCongress : senateCongress).map(
          (number) => (
            <option key={number} value={number}>
              Congress #{number}
            </option>
          )
        )}
      </select>
      <input
        className="input-search"
        placeholder="Search any value"
        onChange={handleChange}
      ></input>
      <select
        className="select"
        name="fields"
        onChange={handleSelect}
        defaultValue="all"
      >
        <option value="all">All fields</option>
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
        <option value="gender">Gender</option>
        <option value="party">Party</option>
      </select>
    </div>
  );
};

export default Search;
