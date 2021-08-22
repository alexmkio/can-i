import { useState, useEffect } from 'react';
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
import { IpFetch, CleanedHour, Notice, Thresholds } from '../../interfaces/index';

export const App = () => {
  const [coordinates, setCoordinates] = useState<IpFetch | undefined>(undefined);
  const [forecast, setForecast] = useState<CleanedHour[]>([]);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [suitableHours, setSuitableHours] = useState<CleanedHour[]>([]);
  const [notice, setNotice] = useState<Notice>({ nice: false, hours: 0 });
  const [schedule, setSchedule] = useState<CleanedHour[]>([]);

  const fetchAndCleanData = async () => {
    let ipKey = `103a0ac5b110412c9a639e3ab5afd99f`
    let ipParams = `&fields=latitude,longitude,time_zone`
    let weatherURL = `https://api.weather.gov/points/`
    try {
      let coordinates = await fetchData(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}${ipParams}`
      )
      let gridPoints = await fetchData(
        `${weatherURL}${coordinates.latitude},${coordinates.longitude}`
      )
      let forecast = await fetchData(gridPoints.properties.forecastGridData)
      let cleanedData = cleanData(forecast)
      setCoordinates(coordinates)
      setForecast(cleanedData)
    } catch (error) {
      setErrorCode(Number(error.message))
    }
  };

  useEffect(() => {
    fetchAndCleanData()
  }, [])

  const getForecast = async (thresholds: Thresholds) => {
    if (coordinates) {
      let suitableHours = await determineSuitableHours(
        thresholds,
        forecast,
        coordinates.time_zone.name
      )
      let notice = craftNotice(suitableHours, coordinates.time_zone.name)
      setNotice(notice)
      setSuitableHours(suitableHours)
    }
  };

  const clearSelected = () => {
    setErrorCode(0)
  }

  const addToCalendar = (hourObject: CleanedHour) => {
    let suitable = suitableHours
    let thatOne = suitable.indexOf(hourObject)
    if (schedule.includes(hourObject)) {
      let currentSchedule = schedule
      let ind = currentSchedule.indexOf(hourObject)
      currentSchedule.splice(ind, 1)
      suitable[thatOne].inCalendar = false
      setSchedule([...currentSchedule])
    } else {
      suitable[thatOne].inCalendar = true
      setSchedule([...schedule, hourObject])
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
              <Calendar
                calendar={schedule}
                addToCalendar={addToCalendar}
              />
            }/>

            <Route exact path='/404' render={() =>
              <Error errorCode={404} clearSelected={clearSelected} />
            }/>
            
            <Redirect to='/404' />
          </Switch>
        )}
        {errorCode === 0 &&
          <Error errorCode={errorCode} clearSelected={clearSelected} />
        }
      </main>
    </>
  );
};