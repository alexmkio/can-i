import { Link } from 'react-router-dom';
import { HourCard } from "../hourCard/HourCard"

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
    <>
      <section>
        <Link to='/calendar'><h2>Click to see your calendar</h2></Link>
      </section>
      <section>
        {hourCards}
      </section>
    </>
  )
};