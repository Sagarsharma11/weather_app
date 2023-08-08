import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style/widget.css'
import { FiCircle } from 'react-icons/fi'
const Widget = () => {
    const [data, setData] = useState("")
    const [geo, setGeo] = useState({})
    const [weather, setWeather] = useState({})
    const [forecast, setForecast] = useState([])
    const [degree, setDegree] = useState("F")
    const [next, setNext] = useState(0)
    const handleSubmit = () => {
        getData(data)
    }
    const getData = (city) => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_KEY}&q=${city}&aqi=no&days=5`)
            .then((res) => {
                //console.log('=>',res.data)
                if (res.status === 200) {
                    setGeo(res?.data?.location)
                    let obj = {}
                    let _weather = res.data.current
                    obj.weatherType = _weather.condition.text
                    obj.icon = _weather.condition.icon
                    obj.temp_c = _weather.temp_c
                    obj.temp_f = _weather.temp_f
                    obj.wind = _weather.wind_mph
                    obj.precip = _weather.precip_in
                    obj.pressure = _weather.pressure_in
                    obj.dayOfWeek = ''
                    setWeather(obj)
                }
            })
            .catch(console.error)
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_KEY}&q=${city}&days=5&aqi=no`)
            .then((res) => {
                //console.log(res)
                if (res.status === 200) {
                    let arr = [];
                    let timestamp = '';
                    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    res.data.forecast.forecastday.forEach((e) => {
                        timestamp = e.date_epoch;
                        let today_ = new Date(timestamp * 1000);
                        const dayOfWeekIndex = today_.getDay();
                        const dayOfWeek = weekdays[dayOfWeekIndex];
                        let obj = {}
                        let _weather = e
                        console.log(weather.pressure, '----')
                        obj.dayOfWeek = dayOfWeek
                        obj.weatherType = _weather.day.condition.text
                        obj.icon = _weather.day.condition.icon
                        obj.temp_c = _weather.day.avgtemp_c
                        obj.temp_f = _weather.day.avgtemp_f
                        obj.wind = _weather.day.maxwind_mph
                        obj.precip = _weather.day.totalprecip_in
                        obj.pressure = weather.pressure
                        //console.log('__________________',obj)
                        arr.push(obj)
                    })
                    setForecast(arr)
                }
            })
            .catch(console.error)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-10">

                </div>
                <div className="col-2">
                    <div className="row mt-2 ">
                        <div className="col-md-7">

                        </div>
                        <div onClick={() => setDegree("F")} className={`${degree === 'F' ? 'bg-danger text-light' : 'text-dark'} p-2 col-md-2 col-4 _pointer`}>
                            F
                        </div>
                        <div onClick={() => setDegree("C")} className={`${degree === 'C' ? 'bg-danger text-light' : 'text-dark'}  p-2 col-md-2 col-4 _pointer`}>
                            C
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <div class="d-flex mt-3" role="search">
                        <input onChange={(e) => setData(e.target.value)} class="form-control me-2" type="search" placeholder="Start entering city name" aria-label="Search" />
                        <button onClick={handleSubmit} class="btn btn-outline-success" type="submit">Search</button>
                    </div>
                </div>
            </div>
            {Object.keys(weather).length ?
                <>
                    <div className="row mt-4 geo-location">
                        <div className="col-md-12">
                            <h2 className='fw-bold' >
                                {Object.keys(geo).length ? geo.name + ' Weather Forecast' : ''}
                            </h2>
                            <h3 className="text-muted">
                                {Object.keys(geo).length ? geo.region + ' ' + geo.country : ''}
                            </h3>
                        </div>
                    </div>
                    <div className="row bg-dark text-light mt-4 rounded">
                        <div className="col-md-12">
                            <p className='text-center m-4'>{Object.keys(forecast).length ? weather.dayOfWeek : ''}</p>
                            <div className="row my-4 p-4">
                                <div className="col-md-8">
                                    <img src={Object.keys(weather).length ? weather.icon : '#'} />
                                    <span>{Object.keys(weather).length ? weather.weatherType : ''}</span>
                                </div>
                                <div className="col-md-4 mt-5 text-center">
                                    <p>Wind: <span>{Object.keys(weather).length ? weather?.wind + ' mph' : ''}</span></p>
                                    <p>Precip: <span>{Object.keys(weather).length ? weather?.precip + ' in' : ''}</span></p>
                                    <p>Pressure: <span>{Object.keys(weather).length ? weather?.pressure + ' in' : ''}</span></p>
                                    <h2>{Object.keys(weather).length ? degree === 'F' ? weather?.temp_f + ' f' : weather?.temp_f + ' c' : ''}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-1">

                                </div>
                                {
                                    forecast.length ?
                                        forecast.map((ele) => {
                                            return <div className="col-md-2">
                                                <p className='text-center'>{ele?.dayOfWeek}</p>
                                                <img className='img-fluid mx-auto d-block' src={ele?.day?.condition?.icon} />
                                                <p className='text-center'>{degree === 'F' ? ele?.temp_f + ' f' : ele?.temp_f + ' c'}</p>
                                            </div>
                                        }) : ''
                                }
                                <div className="col-md-1">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row my-4'>
                        <div className="col-2 col-md-4"></div>
                        <div onClick={() => {
                            setNext(next ? next - 1 : 0)
                            setWeather(forecast[next])
                        }

                        } className='btn btn-info text-light col-4 col-md-2 text-center border  _pointer'>
                            Previous Day
                        </div>
                        <div onClick={() => {
                            setNext(next < 4 ? next + 1 : next)
                            setWeather(forecast[next])
                        }} className='btn btn-primary text-light col-4 col-md-2 text-center border _pointer'>
                            Next Day
                        </div>
                    </div>
                </> : ''
            }
        </div>
    )
}

export default Widget