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
    <>
      <section>
        {hourCards}
      </section>
    </>
  )
};