import { useEffect, useState } from "react";

export default function Home() {

  const [latitude, setLatitude] = useState();

  const [longitude, seLongitude] = useState();

  const [weatherData, setWeatherData] = useState();

  const weatherApi = async()=>{
    const data = await fetch(` https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);

    const res = await data.json();

    const first30Items = res?.properties?.timeseries?.slice(0, 30);


    setWeatherData( first30Items);

  }

  function handleClick(e){
    e.preventDefault();
    if(latitude && longitude){
      console.log("latitude",latitude, "longitude", longitude);
      weatherApi();
    }
  }


  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form>
          <label for="Latitude">Latitude:</label>
          <input onChange={(e)=>setLatitude(e.target.value)} type="" className="latitude"/>

          <label for="">Longitude:</label>
          <input onChange={(e)=>seLongitude(e.target.value)} type="" className="longitude"/>

          <button onClick={handleClick} type="submit">Get Forecast</button>
        </form>


        <table>
          <tr>
            <th>Time</th>
            <th>Temperature  (°C)</th>
            <th>Summary</th>
          </tr>


          {
            weatherData&& weatherData.map((val)=>{
              console.log(val);
              console.log("val", val?.data.next_1_hours?.summary.symbol_code);
            })
          }


            {
              weatherData && weatherData.map((val)=>{
               const date = new Date(val.time);
               const formatData = date.toLocaleString("en-GB",{
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
                });
                return(
                  <tr>
                    <td>{formatData}</td>
                    <td>{val.data.instant.details.air_temperature}</td>
                    <td>{val?.data.next_1_hours?.summary?.symbol_code}</td>
                  </tr>
                )
              })
            }
          
        </table>
      </div>
    </>
  );
}
