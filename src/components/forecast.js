import React from "react";
import { List } from "@material-ui/core";
import moment from "moment";
import "./styles.css";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Forecast = ({ forecastData }) => {
  const WeatherIcon = styled.div`
  color: whitesmoke;
`;
  console.log(forecastData.dailyData);

  const results = forecastData.dailyData.map((item, index) => {
    let weatherIcon = null;

    if (item.weather[0].main === "Thunderstorm") {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (item.weather[0].main === "Drizzle") {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (item.weather[0].main === "Rain") {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (item.weather[0].main === "Snow") {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (item.weather[0].main === "Clear") {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (item.weather[0].main === "Clouds") {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }
    return (
      <div key={index} className="forecast">
        <div className="flex-forecast">
          <div className="day">
            <p className="day">
              {moment(item.dt_txt).format("dddd")},{" "}
              <span>{moment(item.dt_txt).format("LL")}</span>
            </p>
          </div>

          <div className="forecast-temp">
            <p>{item.weather[0].description}</p>
            <p>High: {Math.round(item.main.temp_max)}</p>
            <p>Low: {Math.round(item.main.temp_min)}</p>
          </div>

          <div>
            <WeatherIcon style={{ fontSize: 25, marginTop: 4 }}>
              {weatherIcon}
            </WeatherIcon>
          </div>

          <p className="flex-forecast">{Math.round(item.main.temp)} &deg;F</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <List aria-label="forecast data">{results}</List>
    </div>
  );
};

export default Forecast;