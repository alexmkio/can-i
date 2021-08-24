import { Weather, ThresholdValues } from "../interfaces/weather"
import { CleanedHour, PreciptHour, TempHour, WindHour } from '../interfaces/index';

export const cleanData = (forecast: Weather) => {
  let tempObjects = getTemperature(forecast.properties.temperature.values)
  let windObjects = getWindSpeed(forecast.properties.windSpeed.values)
  let preciptObjects = getProbabilityOfPrecipitation(forecast.properties.windSpeed.values)

  return tempObjects.reduce((newArray: CleanedHour[], currentTempObj) => {
    let matchingWindObj = windObjects.find((currentWindObj) =>
      currentWindObj.month === currentTempObj.month && 
      currentWindObj.day === currentTempObj.day && 
      currentWindObj.hour === currentTempObj.hour)

    let matchingPreciptObj = preciptObjects.find((currentPreciptObj) =>
      currentPreciptObj.month === currentTempObj.month && 
      currentPreciptObj.day === currentTempObj.day && 
      currentPreciptObj.hour === currentTempObj.hour)

    let cleanedHour: CleanedHour = {
      month: currentTempObj.month,
      day: currentTempObj.day,
      hour: currentTempObj.hour,
      inCalendar: false,
      temperature: currentTempObj.temperature,
      windSpeed: matchingWindObj!.windSpeed,
      precipProb: matchingPreciptObj!.precipProb
    }

    return [...newArray, cleanedHour]
  }, [])
};

const getTemperature = (tempValues: ThresholdValues[]) => {
  return tempValues.reduce((newArray: TempHour[], currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray.join().split('H').join().split(',')[2])

    for (let i = 0; i < hoursThisLasts; i++) {
      let thisMonth = month
      let thisDay = day
      let thisHour = hour + i
      if (thisHour > 23) {
        thisDay++
        thisHour = thisHour - 24
      }
      let weatherObj = { 
        month: thisMonth, 
        day: thisDay, 
        hour: thisHour,
        temperature: ((currentValueObject.value! * (9 / 5)) + 32)
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getWindSpeed = (windValues: ThresholdValues[]) => {
  return windValues.reduce((newArray: WindHour[], currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray.join().split('H').join().split(',')[2])

    for (let i = 0; i < hoursThisLasts; i++) {
      let thisMonth = month
      let thisDay = day
      let thisHour = hour + i
      if (thisHour > 23) {
        thisDay++
        thisHour = thisHour - 24
      }
      let weatherObj = { 
        month: thisMonth, 
        day: thisDay, 
        hour: thisHour,
        windSpeed: Math.round(currentValueObject.value! / 1.609344)
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getProbabilityOfPrecipitation = (precipValues: ThresholdValues[]) => {
  return precipValues.reduce((newArray: PreciptHour[], currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray.join().split('H').join().split(',')[2])

    for (let i = 0; i < hoursThisLasts; i++) {
      let thisMonth = month
      let thisDay = day
      let thisHour = hour + i
      if (thisHour > 23) {
        thisDay++
        thisHour = thisHour - 24
      }
      let weatherObj = { 
        month: thisMonth, 
        day: thisDay, 
        hour: thisHour,
        precipProb: currentValueObject.value 
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}