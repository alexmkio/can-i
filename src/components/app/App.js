import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Search } from '../search/Search';
import { Results } from '../results/Results'
import { Possibilities } from '../possibilities/Possibilities'
import { Calendar } from '../calendar/Calendar'
import { Error } from '../error/Error'
import { fetchData } from '../../utils/fetchCalls';
import { cleanData } from '../../utils/cleanData';
import { determineSuitableHours, craftNotice } from '../../utils/utils'

export const App = () => {
  const [coordinates, setCoordinates] = useState({});
  const [forecast, setForecast] = useState([]);
  const [errorCode, setErrorCode] = useState('');
  const [suitableHours, setSuitableHours] = useState([]);
  const [notice, setNotice] = useState({});
  const [calendar, setCalendar] = useState([]);

  const fetchAndCleanData = async () => {
    try {
      let coordinates = await fetchData(
        `https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f`
      )
      let gridPoints = await fetchData(
        `https://api.weather.gov/points/${coordinates.latitude},${coordinates.longitude}`
      )
      let forecast = await fetchData(gridPoints.properties.forecastGridData)
      let cleanedData = await cleanData(forecast)
      setCoordinates(coordinates)
      setForecast(cleanedData)
    } catch (error) {
      setErrorCode(error.message)
    }
  };

  useEffect(() => {
    fetchAndCleanData()
  }, [])

  const getForecast = async (thresholds) => {
    let suitableHours = await determineSuitableHours(
      thresholds,
      forecast,
      coordinates.timezone
    )
    let notice = craftNotice(suitableHours, coordinates.timezone)
    setSuitableHours(suitableHours)
    setNotice(notice)
  };

  const clearSelected = () => {
    setErrorCode('')
  }

  const addToCalendar = (hourObject) => {
    let suitable = suitableHours
    let thatOne = suitable.indexOf(hourObject)
    if (calendar.includes(hourObject)) {
      let currentCalendar = calendar
      let ind = currentCalendar.indexOf(hourObject)
      currentCalendar.splice(ind, 1)
      suitable[thatOne].inCalendar = false
      setCalendar([...currentCalendar])
    } else {
      suitable[thatOne].inCalendar = true
      setCalendar([...calendar, hourObject])
    }
    setSuitableHours([...suitable])
  }

  return (
    <>
      <header>
        <Link to='/'>
          <h1>Can I look at a tree?</h1>
        </Link>
      </header>
      <main>
        {errorCode &&
          <Error errorCode={errorCode} clearSelected={clearSelected} />
        }
        {!errorCode && (
          <Switch>
            <Route exact path='/' render={() =>
              <Search getForecast={getForecast} /> 
            }/>

            <Route exact path='/results' render={() =>
              <Results notice={notice} />
            }/>

            <Route exact path='/good_weather' render={() =>
              <Possibilities
                suitableHours={suitableHours}
                addToCalendar={addToCalendar}
              />
            }/>

            <Route exact path='/calendar' render={() =>
              <Calendar calendar={calendar} addToCalendar={addToCalendar} />
            }/>

            <Route exact path='/404' render={() =>
              <Error errorCode={404} clearSelected={clearSelected} />
            }/>
            
            <Redirect to='/404' />
          </Switch>
        )}
      </main>
    </>
  );
};