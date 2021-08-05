import React, { useState } from 'react';

export const Search = ({ getForecast }) => {
  const [duration, setDuration] = useState(1);
  const [minTemp, setMinTemp] = useState(50);
  const [maxTemp, setMaxTemp] = useState(90);
  const [wind, setWindSpeed] = useState(10);
  const [precipProbability, setProbability] = useState(50);

  const onSubmitSearch = (event) => {
    event.preventDefault()

    let thresholds = {
      duration: duration,
      temperature: { minTemp: minTemp, maxTemp: maxTemp },
      windSpeed: wind,
      probabilityOfPercip: precipProbability
    }
    
    getForecast(thresholds)
  }

  return (
    <form>
      <label>
          Duration:
        <select value={duration} onChange={event => setDuration(Number(event.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </select>
      </label>

      <label>
          Min Temperature:
        <select value={minTemp} onChange={event => setMinTemp(Number(event.target.value))}>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
        </select>
      </label>

      <label>
          Max Temperature:
        <select value={maxTemp} onChange={event => setMaxTemp(Number(event.target.value))}>
          <option value={80}>80</option>
          <option value={90}>90</option>
          <option value={100}>100</option>
        </select>
      </label>

      <label>
          Wind Speed:
        <select value={wind} onChange={event => setWindSpeed(Number(event.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </label>

      <label>
          Probability of Precipitation:
        <select value={precipProbability} onChange={event => setProbability(Number(event.target.value))}>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={70}>70</option>
        </select>
      </label>

      <button onClick={event => onSubmitSearch(event)}>
        Submit
      </button>
    </form>
  )
};