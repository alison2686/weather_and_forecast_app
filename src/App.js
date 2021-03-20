import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather'
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {
  
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log(position)
      });

      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)

      if (lat !== '' && long !== '') {
        let weatherAPI = fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        let forecastAPI = fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
     await Promise.all([weatherAPI, forecastAPI])
      .then(values => Promise.all(values.map(value => value.json())))
      .then(finalVals => {
        let weatherAPIResp = finalVals[0]
        let forecastAPIResp = finalVals[1]
        setWeatherData(weatherAPIResp)
        setForecast(forecastAPIResp)
        console.log(weatherAPIResp, forecastAPIResp)
      })
      .catch(error=>console.log(error));
    }
  }
    fetchData();
    
  }, [lat, long])

  return (
    <div className="App">
      {(typeof weatherData.main != 'undefined') ? (
        <Weather weatherData={weatherData} forecast={forecast}/>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>
      )}
      
    </div>
  );
}