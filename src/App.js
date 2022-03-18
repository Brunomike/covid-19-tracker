import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import Header from "./components/header/Header";
import InfoBox from "./components/infoBox/InfoBox";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import LineGraph from "./components/lineGraph/LineGraph";
import "./App.css";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countryInfo, setCountryInfo] = useState();
  const [tableData,setTableData]=useState([]);
  const [mapCenter,setMapCenter] = useState({lat:34.80476,lng:-40.4796});
  const [mapZoom,setMapZoom] = useState(3);

  useEffect(() => {
    handleCountryChange("worldwide");
    // fetch("https://disease.sh/v3/covid-19/all")
    //   .then((response) => response.json())
    //   .then((data) => {        
    //     setCountryInfo(data);
    //   });
  }, []);

  const handleCountryChange = async (countryCode) => {
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https:/disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  //console.log("TABLE DATA: "+tableData);

  return (
    <div className="app">
      <div className="app__left">
        <Header onCountryChange={handleCountryChange} setTableData={setTableData}/>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo?.todayCases}
            total={countryInfo?.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo?.todayRecovered}
            total={countryInfo?.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo?.todayDeaths}
            total={countryInfo?.deaths}
          />
        </div>        
        <Map center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <br/>
          <h3>Worldwide new cases</h3>
          <LineGraph/>          
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
