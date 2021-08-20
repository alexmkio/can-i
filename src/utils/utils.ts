import { Thresholds, CleanedHour } from "../interfaces/index";

export const determineSuitableHours = (thresholds: Thresholds, cleanedData: CleanedHour[], timezone: string) => {
  let currentDateInHours = findUsersDateInHours(timezone)
  return cleanedData.filter(currentHourObj => {
    let weatherDateInHours = ((currentHourObj.day * 24) + currentHourObj.hour)
    if (weatherDateInHours >= currentDateInHours && 
      currentHourObj.temperature <= thresholds.temperature.high && 
      currentHourObj.temperature >= thresholds.temperature.low && 
      currentHourObj.windSpeed <= thresholds.windSpeed && 
      currentHourObj.probabilityOfPrecipitation <= thresholds.probOfPrecip
    ) {
      return currentHourObj
    }
  })
};

export const craftNotice = (suitableHours: CleanedHour[], timezone: string) => {
  let currentDateInHours = findUsersDateInHours(timezone)
  let incremented = 0
  let nextOpportunity = 0
  let incrementingCurrentHours = currentDateInHours

  suitableHours.every(hourObject => {
    let weatherDateInHours = ((hourObject.day * 24) + hourObject.hour)
    if (incrementingCurrentHours === weatherDateInHours) {
      incremented++
      incrementingCurrentHours++
      return true
    } else {
      nextOpportunity = weatherDateInHours - currentDateInHours
      return false
    }
  })

  if (incremented) {
    return { nice: true, hours: incremented }
  } else {
    return { nice: false, hours: nextOpportunity }
  }
};

const findUsersDateInHours = (timezone: string) => {
  let splitDate = new Date().toLocaleString("en-US", {timeZone: timezone})
    .split('/').join(':').split(':').join(', ').split(', ').join(' ').split(' ')
  let hour = Number(splitDate[3])
  if (splitDate[6] === 'PM') {
    hour = hour + 12
  }
  return ((Number(splitDate[1]) * 24) + hour)
}