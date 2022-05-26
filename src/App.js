import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./components/weather";
import { Dimmer, Loader } from "semantic-ui-react";
import Forecast from "./components/forecast";

export default function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      if (lat !== "" && long !== "") {
        let weatherAPI = fetch(
          `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
        );
        let forecastAPI = fetch(
          `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
        );
        await Promise.all([weatherAPI, forecastAPI])
          .then((values) => Promise.all(values.map((value) => value.json())))
          .then((finalVals) => {
            let weatherAPIResp = finalVals[0];
            let forecastAPIResp = finalVals[1];
            setWeatherData(weatherAPIResp);
            const dailyData = forecastAPIResp.list.filter((reading) =>
              reading.dt_txt.includes("18:00:00")
            );
            setForecastData({ dailyData });
            console.log(weatherAPIResp, forecastAPIResp.list, dailyData);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {typeof weatherData.main != "undefined" ||
      typeof forecastData.dailyData != "undefined" ? (
        <div>
          <Weather weatherData={weatherData} forecastData={forecastData} />
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>
              Loading..Please enable your location in your browser.
            </Loader>
          </Dimmer>
        </div>
      )}

      {typeof forecastData.dailyData != "undefined" ? (
        <div>
          <Forecast forecastData={forecastData} />
        </div>
      ) : (
        <div>
          <Dimmer active>
            <Loader>
              Loading..Please enable your location in your browser.
            </Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}