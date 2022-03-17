import React, { useState ,useEffect} from "react";
import {FormControl,Select,MenuItem,Card,CardContent,} from "@material-ui/core";
import "./Header.css";

const Header = () => {
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
        //console.log(countriesFormat);
        setCountries(countriesFormat)
    })
    .catch(error=>console.log(error.message))
    }
    

    getCountiesData();
  },[])

  const handleCountryChange = async (e)=>{
    const countryCode=e.target.value;
    setCountry(countryCode);    
  }

  
  return (
    <div className="header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="header__dropdown">
        <Select variant="outlined" value={country} onChange={(e)=>handleCountryChange(e)}>
        <MenuItem key="worldwide" value="worldwide" >Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value} >{country.name}</MenuItem>
          ))}                  
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
