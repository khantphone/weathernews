import React, { use, useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

    const [weatherData , setWeatherData] = useState(false);
    const search = async (city) =>{
        try{
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

            
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

        }
        catch(error) {

        }
    }

    useEffect(()=>{
        search("Tokyo");
    },[])

  return (
    <div className='weather'>
        <div className="search__bar">
            <input type="text" placeholder='検索' />
            <img src={search_icon} alt="検索アイコン" />
        </div>
        <img src={clear_icon} alt="太陽アイコン" className='weather__icon'/>
        <h1 className='temperature'>12degree celcisu</h1>
        <p className='location'>Tokyo</p>
        <div className="weather__data">
            <div className="col">
                <img src={humidity_icon} alt="湿度アイコン" />
                <div>
                    <p>91%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="風アイコン" />
                <div>
                    <p>91km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
