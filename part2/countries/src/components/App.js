import React, { useState, useEffect } from 'react';
import axios from 'axios';

const weatherURI = 'http://api.weatherstack.com/current';
const countryURI = 'https://restcountries.eu/rest/v2/all';
const key = '0cd4400c6bc47a8682c0aa05dc6bc050';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(-1);
  const [weather, setWeather] = useState(undefined);

  const filteredContries = filter.length > 0 ? countries.filter(c => c.name.toLowerCase().includes(filter)) : [];

  const selectCountry = index => {
    setShow(index);

    if (index > -1) {
      axios.get(`${weatherURI}?access_key=${key}&query=${filteredContries[index].capital}`).then(response => {
        setWeather(response.data);
      });
    } else {
      setWeather(undefined);
    }
  };

  const onChangeFilter = event => {
    setFilter(event.target.value);
    selectCountry(-1);
  };

  useEffect(() => {
    axios.get(countryURI).then(response => {
      setCountries(response.data);
    });
  }, []);

  if (filteredContries.length === 1 && show !== 0) {
    selectCountry(0);
  }

  return (
    <div>
      find countries <input value={filter} onChange={onChangeFilter} />
      {show > -1 ? (
        <div>
          <h1>{filteredContries[show].name}</h1>
          <p>capital {filteredContries[show].capital}</p>
          <p>population {filteredContries[show].population}</p>
          <h3>languages</h3>
          <ul>
            {filteredContries[show].languages.map(l => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <img src={filteredContries[show].flag} width='100' alt={filteredContries[show].name} />
          {weather && (
            <div>
              <h3>Weather in {filteredContries[show].capital}</h3>
              <strong>temperature: </strong> {weather.current.temperature} Celsius
              <div>
                {weather.current.weather_icons.map(icon => (
                  <img key={icon} src={icon} width='100' alt={filteredContries[show].name} />
                ))}
              </div>
              <strong>wind: </strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}
            </div>
          )}
        </div>
      ) : filteredContries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {filteredContries.map((c, index) => (
            <div key={c.numericCode}>
              {c.name} <button onClick={() => selectCountry(index)}>show</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
