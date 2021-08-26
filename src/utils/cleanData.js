export const cleanData = (forecast) => {
  let tempObjects = getTemperature(forecast.temperature.values)
  let windObjects = getWindSpeed(forecast.windSpeed.values)
  let preciptObjects = getProbabilityOfPrecipitation(forecast.windSpeed.values)

  return tempObjects.reduce((newArray, currentTempObj) => {
    let matchingWindObj = windObjects.find((currentWindObj) =>
      currentWindObj.month === currentTempObj.month && 
      currentWindObj.day === currentTempObj.day && 
      currentWindObj.hour === currentTempObj.hour)
    let matchingPreciptObj = preciptObjects.find((currentPreciptObj) =>
      currentPreciptObj.month === currentTempObj.month && 
      currentPreciptObj.day === currentTempObj.day && 
      currentPreciptObj.hour === currentTempObj.hour)

    if (matchingWindObj && matchingPreciptObj) {
      let cleanedHour = {
        month: currentTempObj.month,
        day: currentTempObj.day,
        hour: currentTempObj.hour,
        inCalendar: false,
        temperature: currentTempObj.temperature,
        windSpeed: matchingWindObj.windSpeed,
        precipProb: matchingPreciptObj.precipProb
      }
      newArray.push(cleanedHour)
    }
    return newArray
  }, [])
};

const getTemperature = (tempValues) => {
  return tempValues.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray
      .join().split('H').join().split(',')[2])

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
        temperature: ((currentValueObject.value * (9 / 5)) + 32)
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getWindSpeed = (windValues) => {
  return windValues.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray
      .join().split('H').join().split(',')[2])

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
        windSpeed: Math.round(currentValueObject.value / 1.609344)
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}

const getProbabilityOfPrecipitation = (precipValues) => {
  return precipValues.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = Number(fullArray
      .join().split('H').join().split(',')[2])

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