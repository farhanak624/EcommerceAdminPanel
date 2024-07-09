import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country } from "country-state-city";

const SingleCountrySelect = ({ onChange, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setOptions(countries);
  }, []);

  return <Select options={options} onChange={onChange} value={value} />;
};

export default SingleCountrySelect;
