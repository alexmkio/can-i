import { Weather } from "../interfaces/weather"
// import { CleanedHour } from '../interfaces/index';

export const cleanData = (forecast: Weather) => {
  let tempObjects = getTemperature(forecast)
  let windObjects = getWindSpeed(forecast)
  let preciptObjects = getProbabilityOfPrecipitation(forecast)

  // let heyyy: CleanedHour[] = []
  // if (tempObjects.length && windObjects.length && preciptObjects.length) {
  //   tempObjects.forEach(currentTempObj => {
  //     let matchingWindObj = windObjects.find(currentWindObj =>
  //       currentWindObj.month === currentTempObj.month && 
  //       currentWindObj.day === currentTempObj.day && 
  //       currentWindObj.hour === currentTempObj.hour)
  //     let matchingPreciptObj = preciptObjects.find(currentPreciptObj =>
  //       currentPreciptObj.month === currentTempObj.month && 
  //       currentPreciptObj.day === currentTempObj.day && 
  //       currentPreciptObj.hour === currentTempObj.hour)
  //     if (matchingWindObj) {
  //       currentTempObj.windSpeed = matchingWindObj.windSpeed
  //     }
  //     if (matchingPreciptObj) {
  //       currentTempObj.precipProb = matchingPreciptObj.precipProb
  //     }
  //     heyyy.push(currentTempObj)
  //   })
  // }
  // return heyyy

  return tempObjects.map(currentTempObj => {
    let matchingWindObj = windObjects.find(currentWindObj =>
      currentWindObj.month === currentTempObj.month && 
      currentWindObj.day === currentTempObj.day && 
      currentWindObj.hour === currentTempObj.hour)
    let matchingPreciptObj = preciptObjects.find(currentPreciptObj =>
      currentPreciptObj.month === currentTempObj.month && 
      currentPreciptObj.day === currentTempObj.day && 
      currentPreciptObj.hour === currentTempObj.hour)
    if (matchingWindObj) {
      currentTempObj.windSpeed = matchingWindObj.windSpeed
    }
    if (matchingPreciptObj) {
      currentTempObj.precipProb = matchingPreciptObj.precipProb
    }
    return currentTempObj
  })
};

const getTemperature = (forecast: Weather) => {
  let tempValues = forecast.properties.temperature.values
  return tempValues.reduce((newArray, currentValueObject) => {
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
        inCalendar: false,
        temperature: ((currentValueObject.value * (9 / 5)) + 32),
        windSpeed: 0,
        precipProb: 0
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getWindSpeed = (forecast: Weather) => {
  let windValues = forecast.properties.windSpeed.values
  return windValues.reduce((newArray, currentValueObject) => {
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
        temperature: 0,
        windSpeed: Math.round(currentValueObject.value / 1.609344),
        precipProb: 0
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getProbabilityOfPrecipitation = (forecast: Weather) => {
  let precipValues = forecast.properties.probabilityOfPrecipitation.values
  return precipValues.reduce((newArray, currentValueObject) => {
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
        temperature: 0,
        windSpeed: 0,
        precipProb: currentValueObject.value 
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}