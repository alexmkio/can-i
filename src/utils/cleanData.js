export const cleanData = (forecast) => {
  let tempObjects = getTemperature(forecast)
  let windObjects = getWindSpeed(forecast)
  let preciptObjects = getProbabilityOfPrecipitation(forecast)

  return tempObjects.map(currentTempObj => {
    let matchingWindObj = windObjects.find(currentWindObj => {
      if (currentWindObj.month === currentTempObj.month && 
        currentWindObj.day === currentTempObj.day && 
        currentWindObj.hour === currentTempObj.hour) {
          return currentWindObj
      }
    })
    let matchingPreciptObj = preciptObjects.find(currentPreciptObj => {
      if (currentPreciptObj.month === currentTempObj.month && 
        currentPreciptObj.day === currentTempObj.day && 
        currentPreciptObj.hour === currentTempObj.hour) {
          return currentPreciptObj
        }
    })
    if (matchingWindObj) {
      currentTempObj.windSpeed = matchingWindObj.windSpeed
    }
    if (matchingPreciptObj) {
      currentTempObj.probabilityOfPrecipitation = matchingPreciptObj.probabilityOfPrecipitation
    }
    return currentTempObj
  })
};

const getTemperature = (forecast) => {
  return forecast.properties.temperature.values.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = fullArray.join().split('H').join().split(',')[2]

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

const getWindSpeed = (forecast) => {
  return forecast.properties.windSpeed.values.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = fullArray.join().split('H').join().split(',')[2]

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

const getProbabilityOfPrecipitation = (forecast) => {
  return forecast.properties.probabilityOfPrecipitation.values.reduce((newArray, currentValueObject) => {
    let fullArray = currentValueObject.validTime.split('T')
    let dateArray = fullArray[0].split('-')
    let month = Number(dateArray[1])
    let day = Number(dateArray[2])
    let hour = Number(fullArray[1].split(':')[0])
    let hoursThisLasts = fullArray.join().split('H').join().split(',')[2]

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
        probabilityOfPrecipitation: currentValueObject.value 
      }
      newArray.push(weatherObj)
    }
    return newArray
  }, [])
}