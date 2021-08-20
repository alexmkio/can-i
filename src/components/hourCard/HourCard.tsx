import React from 'react';
import { HourProps } from '../../interfaces/index';
import './HourCard.css';
import { calendar } from '../../utils/time'

export const HourCard: React.FC<HourProps> = ({ hour, addToCalendar }) => {
  let month = calendar.months.find(month => month.number === hour.month)?.name
  let time = calendar.hours.find(thisHour => thisHour.number === hour.hour)?.name
  let icon = (hour.inCalendar ? 'remove' : 'add')

  return (
    <article className='card'>
      <label>
        <button className="material-icons-outlined md-24 icon"
          onClick={() => addToCalendar(hour)}
        >
          {icon}
        </button>
      </label>

      <dl>
        <dt>Date:</dt>
        <dd>{month} {hour.day}</dd>

        <dt>Hour:</dt>
        <dd>{time}</dd>

        <dt>Temperature:</dt>
        <dd>{hour.temperature} <span>&#8457;</span></dd>

        <dt>Wind Speed:</dt>
        <dd>{hour.windSpeed} mph</dd>

        <dt>Probability of Precipitation:</dt>
        <dd>{hour.probabilityOfPrecipitation}%</dd>
      </dl>
    </article>
  )
};