import React from 'react';
import { Link } from 'react-router-dom';
import { ResultsProps } from '../../interfaces/index';
import './Results.css';

export const Results: React.FC<ResultsProps> = ({ notice }) => {
  let result
  if (notice.nice) {
    result = <><h2>Good news!</h2>
      <p>You can go outside for {notice.hours} hours!</p></>
  } else {
    result = <><h2>Bad news</h2>
      <p>You can't go outside for {notice.hours} hours!</p></>
  }

  return (
    <section className='results'>
      {result}
      <Link to='/good_weather'>See all the future good weather</Link>
    </section>
  )
};