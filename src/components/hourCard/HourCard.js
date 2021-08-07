export const HourCard = ({ hour, addToCalendar }) => {
  return (
    <article onClick={() => addToCalendar(hour)}>
      <h3>{hour.month}</h3>
      <h3>{hour.day}</h3>
      <h3>{hour.hour}</h3>
      <h3>{hour.temperature}</h3>
      <h3>{hour.windSpeed}</h3>
      <h3>{hour.probabilityOfPrecipitation}</h3>
    </article>
  )
};