import './App.css';
import React, { useEffect, useState } from "react";
// import Weather from './components/weather';
import CardExampleCard from './components/weather'

export default function App() {
  
  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])
  const [weatherData, setWeatherData] = useState([])
  // const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(result => {
        setWeatherData(result)
        console.log(result);
      })
      .catch(error=>console.log(error));
    }
    fetchData();
  }, [lat,long])

  // function handleResponse(response) {
  //   if (response.ok) {
  //     return response.json()
  //   } else {
  //     throw new Error ("Please Enable your Location in your browser")
  //   }
  // }

  // function getWeather(lat, long) {
  //   return fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
  //   .then(res => res.json())
  //   .then(result => {
  //     weatherData(result)
  //     console.log(result);
  //   });
  // }

  // function mapDataToWeatherInterface(data) {
  //   const mapped = {
  //     date: data.dt * 1000, // convert from seconds to milliseconds
  //     description: data.weather[0].main,
  //     temperature: Math.round(data.main.temp),
  //   };
  
  //   // Add extra properties for the five day forecast: dt_txt, icon, min, max
  //   if (data.dt_txt) {
  //     mapped.dt_txt = data.dt_txt;
  //   }
  
  //   return mapped;
  // }


  
  return (
    <div className="App">
      {(typeof weatherData.main != 'undefined') ? (
        <CardExampleCard weatherData={weatherData}/>
      ): (
        <div></div>
      )}
      
    </div>
  );
}