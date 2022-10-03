import { useState } from "react"
import React from 'react'
import axios from 'axios'

const api = {
  key: 'adcdf091ced74132add221243220210',
  base: 'http://api.weatherapi.com/v1/'
}
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      setLocation(setLocation(e.target.value));
      axios.get(`${api.base}current.json?key=${api.key}&q=${location}`).then((response) => {
        setData(response.data)
        console.log("This is Dada:: ", response.data)
      })
      setLocation('')
    }

  }

  return (
    <div className={(typeof data.location != "undefined")? ((data.current.is_day === 0) ? 'app change' : 'app') : 'app'}>
        <div className="search">
          <input
            onChange={e => setLocation(e.target.value)}
            value={location}
            placeholder="Enter City"
            onKeyPress={searchLocation}
            type="text"
          />
        </div>

        <div className="container">
            <div className="top">
              <div className="location">
                {data.location ? <h2>{data.location.name}, {data.location.region}</h2> : null}
              </div>
              <div className="time">
                {data.location ? <p>{data.location.localtime}</p> : null}
              </div>
              <div className="temp">
                {data.current ? <h1>{data.current.temp_f} °F</h1> : null}
              </div>
                <div className="side">
                  <div className="icon">
                    {data.current ? <img src={data.current.condition.icon} /> : null}
                  </div>
                  <div className="description">
                    {data.current ? <p>{data.current.condition.text}</p> : null}
                  </div>
                </div>
            </div>

            {data.current != undefined &&
              <div className="bottom">
              <div className="celsius">
                <p className="bold">Celsius</p>
                {data.current ? <p>{data.current.temp_c}°C</p> : null}
              </div>
              <div className="humidity">
                <p className="bold">Humidity</p>
                {data.current ? <p>{data.current.humidity}%</p> : null}
              </div>
              <div className="wind">
                <p className="bold">Wind</p>
                {data.current ? <p>{data.current.wind_mph} mph</p> : null}
              </div>
            </div>
            }
              

        </div>


    </div>
  );
}

export default App;
