import React from 'react';

export const Search = ({ getForecast }) => {

  const onSubmitSearch = (event) => {
    event.preventDefault()
    getForecast()
  }

  return (
    <form>
      <button type='submit' onClick={event => onSubmitSearch(event)}>
        Submit
      </button>
    </form>
  )
};