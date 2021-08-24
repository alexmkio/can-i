import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorProps } from '../../interfaces/index';
import './Error.css';
import { httpResponses } from '../../utils/httpResponses'

export const Error: React.FC<ErrorProps> = ({ errorCode, clearSelected }) => {
  let matchingResponse = httpResponses.find(response =>
    response.code === Number(errorCode)
  )

  if (matchingResponse) {
    return (
      <article className='error-container'>
        <div className='error-div'>
          <h2 className='error-h2'>Error {matchingResponse.code}</h2>
          <h3>{matchingResponse.message}</h3>
          <p>{matchingResponse.description}</p>
          <Link to='/'>
            <button className='details-back' onClick={clearSelected}>Back</button>
          </Link>
        </div>
      </article>
    )
  } else {
    return (
      <>
      </>
    )
  }
}