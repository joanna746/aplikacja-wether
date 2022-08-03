import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';



const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7e5f2be18a3f21927b4d3d8ac7266e95&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main,
              };
              setWeather(weatherData);

              setError(false);
            });
        } else {
          setError(true);
          
        }
      }, []);
  });
  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && <WeatherSummary weather={weather} />}
      {!error && <Loader />}
      {error &&<ErrorBox>We don't have</ErrorBox>}
    </section>
  )
};
export default WeatherBox;