import React from 'react';
import { Button } from 'semantic-ui-react';
import './styles.css'
import moment from 'moment'

const Weather = ({weatherData}) => {

  const refresh = () => {
    window.location.reload();
  }
  return (
    <div className="main">

      <div className="top">
      <p className="header">{weatherData.name}</p>
      <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
      </div>
      
      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>

      <div className="flex">
          <div>
              <img className="weather_icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
              <p className="temp">{weatherData.weather[0].description}</p>
          </div>
          
      </div>

      <div className="flex">
        <p className="temp">Temprature: {Math.round(weatherData.main.temp)} &deg;F</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>
    
  </div>

  )
}

export default Weather;

