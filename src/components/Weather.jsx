import React, { useEffect, useRef, useState } from 'react'
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

        // デフォルトは中野
        const isDefaultNakano = !city;

        if (city === "") {
            alert("都市名を入力してください。");
            return;
        }

        try {

            const query = isDefaultNakano
                ? `lat=35.7074&lon=139.6655` // 中野区を中心に
                : `q=${city},JP`;

            const url =
                `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                alert("都市が見つかりません。");
                return;
            }

            const icon =
                allIcons[data.weather[0].icon] || clear_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: isDefaultNakano
                    ? "東京、中野区"
                    : data.name,
                icon: icon,
            });

        } catch (error) {
            setWeatherData(false);
            console.error("データ取得中にエラーが発生しました。");
        }
    }

    
    useEffect(() => {
        search(); 
    }, [])

    return (
        <div className='weather'>

            {/*  検索 */}
            <div className="search__bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='都市名を検索'
                />
                <img
                    src={search_icon}
                    alt="検索"
                    onClick={() =>
                        search(inputRef.current.value)
                    }
                />
            </div>

            {/*  天気表示する */}
            {weatherData ? <>
                <img
                    src={weatherData.icon}
                    alt="天気アイコン"
                    className='weather__icon'
                />

                <h1 className='temperature'>
                    {weatherData.temperature}°C
                </h1>

                <p className='location'>
                    {weatherData.location}
                </p>

                <div className="weather__data">

                    {/* 湿度を表示する */}
                    <div className="col">
                        <img
                            src={humidity_icon}
                            alt="湿度"
                        />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>湿度</span>
                        </div>
                    </div>

                    {/* 風速を表示する */}
                    <div className="col">
                        <img
                            src={wind_icon}
                            alt="風速"
                        />
                        <div>
                            <p>{weatherData.windSpeed} m/s</p>
                            <span>風速</span>
                        </div>
                    </div>

                </div>
            </> : null}

        </div>
    )
}

export default Weather
