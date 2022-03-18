import React, { useState ,useEffect} from "react";
import {FormControl,Select,MenuItem} from "@material-ui/core";
import {sortData} from "../../utils/utils";
import "./Header.css";

const Header = ({onCountryChange,setTableData}) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(()=>{
    const getCountiesData=async()=>{
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then(res=>res.json())
    .then(data=>{        
        const countriesFormat=data.map((country)=>(
            {
                name:country.country,
                id:country.countryInfo._id,
                value:country.countryInfo.iso2
            }
        ));      

        const sortedData=sortData(data)
        setTableData(sortedData);        
        setCountries(countriesFormat);
    })
    .catch(error=>console.log(error.message))
    }


    getCountiesData();
  },[setTableData])

  const handleCountryChange = async (e)=>{
    const countryCode=e.target.value;
    setCountry(countryCode);  
    onCountryChange(countryCode);
  }

  
  return (
    <div className="header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="header__dropdown">
        <Select variant="outlined" value={country} onChange={(e)=>handleCountryChange(e)}>
        <MenuItem key="worldwide" value="worldwide" >Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value} >{country.name}</MenuItem>
          ))}                  
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
