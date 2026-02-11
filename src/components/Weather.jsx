import React, { use, useEffect, useRef, useState } from 'react'
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

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }


    const search = async (city) => {

        if (city === "") {
            alert("検索してください。");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const res = await fetch(url);
            const data = await res.json();

            if(!res.ok){
                alert(data.message);
                return;
            }

            console.log(data);
            const icon = allIcons[dataWeather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })

        }
        catch (error) {
            setWeatherData(false);
            console.error("データの取得中にエラーが発生しました!")
        }
    }

    useEffect(() => {
        search("Tokyo");
    }, [])

    return (
        <div className='weather'>
            <div className="search__bar">
                <input ref={inputRef} type="text" placeholder='検索' />
                <img src={search_icon} alt="検索アイコン" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="天気によってアイコンが変わる" className='weather__icon' />
                <h1 className='temperature'>{weatherData.temperature}°C</h1>
                <p className='location'>{weatherData.location}</p>
                <div className="weather__data">
                    <div className="col">
                        <img src={humidity_icon} alt="湿度アイコン" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="風アイコン" />
                        <div>
                            <p>{weatherData.windSpeed} km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </> : <></>}
            {/* not showing anything if the api is wrong or the city is wrong */}

        </div>
    )
}

export default Weather
