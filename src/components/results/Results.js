import { Link } from 'react-router-dom';

export const Results = ({ notice }) => {
  return (
    <>
      <h1>{notice}</h1>
      <Link to='/good_weather'><h2>See all the future good weather</h2></Link>
    </>
  )
};