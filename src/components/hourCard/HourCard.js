import './HourCard.css';
import { months, hours } from '../../utils/time'

export const HourCard = ({ hour, addToCalendar }) => {
  let month = months.find(month => month.number === hour.month).name
  let time = hours.find(thisHour => thisHour.number === hour.hour).name

  return (
    <article className='card' onClick={() => addToCalendar(hour)}>
      <dl>
        <dt>Date:</dt>
        <dd>{month} {hour.day}</dd>

        <dt>Hour:</dt>
        <dd>{time}</dd>

        <dt>Temperature:</dt>
        <dd>{hour.temperature} <span>&#8457;</span>F</dd>

        <dt>Wind Speed:</dt>
        <dd>{hour.windSpeed} mph</dd>

        <dt>Probability of Precipitation:</dt>
        <dd>{hour.probabilityOfPrecipitation}%</dd>
      </dl>
    </article>
  )
};