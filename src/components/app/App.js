// import React, { useState } from 'react';
import React from 'react';
import { Search } from '../search/Search';
import './App.css';
import { getDataFromAPI } from '../../utils/fetchCalls';


export const App = () => {

  const getForecast = async () => {
    try {
      let coordinates = await getDataFromAPI('http://ip-api.com/json/?fields=16576')
      let gridPoints = await getDataFromAPI(`https://api.weather.gov/points/${coordinates.lat},${coordinates.lon}`)
      let forecast = await getDataFromAPI(gridPoints.properties.forecastGridData)
    } catch (error) {
      console.log('ERROR', error)
    }
  };

  return (
    <>
      <header>
        <h1>Freshly Fetched</h1>
      </header>
      <main>
        <Search getForecast={getForecast} />
      </main>
    </>
  );
};