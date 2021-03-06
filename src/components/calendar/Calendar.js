import PropTypes from 'prop-types';
import { HourCard } from "../hourCard/HourCard"

export const Calendar = ({ calendar, addToCalendar }) => {
  let hourCards = calendar.map(hour => {
    return (
      <HourCard
        key={`${hour.month}${hour.day}${hour.hour}`}
        hour={hour}
        addToCalendar={addToCalendar}
      />
    )
  })

  return (
    <section className='poss'>
      <section className='possBlurb'>
        <h2>Your calendar</h2>
        <p>Click on an hour to delete it from your calendar</p>
      </section>
      <section className='cards'>
        {hourCards}
      </section>
    </section>
  )
};

Calendar.propTypes = {
  calendar: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCalendar: PropTypes.func.isRequired
};