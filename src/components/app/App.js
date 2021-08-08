import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const fetchAndCleanData = async () => {
    try {
      let ipUrl = 'http://ip-api.com/json/?fields=49600'
      let weatherApi = 'https://api.weather.gov/points/'
      let coordinates = await fetchData(ipUrl)
      let pointsUrl = `${weatherApi}${coordinates.lat},${coordinates.lon}`
      let points = await fetchData(pointsUrl)
      let forecast = await fetchData(points.properties.forecastGridData)
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
    history.push('/results');
  };

  const clearSelected = () => {
    setErrorCode('')
  }

  const addToCalendar = (hourObject) => {
    if (calendar.includes(hourObject)) {
      let ind = calendar.indexOf(hourObject)
      calendar.splice(ind, 1)
    } else {
      setCalendar([...calendar, hourObject])
    }
  }

  return (
    <>
      <header>
        <h1>Can I look at a tree?</h1>
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