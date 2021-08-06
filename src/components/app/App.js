// import React, { useState } from 'react';
import React from 'react';
import { Search } from '../search/Search';
import './App.css';
import { getDataFromAPI } from '../../utils/fetchCalls';
import { cleanData } from '../../utils/cleanData';
import { determineSuitableHours, craftNotice } from '../../utils/utils'


export const App = () => {

  const getForecast = async (thresholds) => {
    try {
      let coordinates = await getDataFromAPI('http://ip-api.com/json/?fields=49600')
      let gridPoints = await getDataFromAPI(`https://api.weather.gov/points/${coordinates.lat},${coordinates.lon}`)
      let forecast = await getDataFromAPI(gridPoints.properties.forecastGridData)
      let cleanedData = await cleanData(forecast)
      let suitableHours = await determineSuitableHours(thresholds, cleanedData, coordinates.timezone)
      let notice = craftNotice(suitableHours, coordinates.timezone)
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