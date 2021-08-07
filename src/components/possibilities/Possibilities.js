import { Link } from 'react-router-dom';
import { HourCard } from "../hourCard/HourCard"
import './Possibilities.css';

export const Possibilities = ({ suitableHours, addToCalendar }) => {
  let hourCards = suitableHours.map(suitableHour => {
    return (
      <HourCard
        key={`${suitableHour.month}${suitableHour.day}${suitableHour.hour}`}
        hour={suitableHour}
        addToCalendar={addToCalendar}
      />
    )
  })

  return (
    <section className='poss'>
      <section className='possBlurb'>
        <h2>Suitable hours to be outside</h2>
        <p>Click on an hour to add or delete it from your calendar</p>
        <Link to='/calendar'>Your calendar</Link>
      </section>
      <section className='cards'>
        {hourCards}
      </section>
    </section>
  )
};