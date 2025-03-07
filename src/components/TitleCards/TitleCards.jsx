import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom'

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU5NTcyMmIwNmNmNDJlMDA1NDQxZWY5M2E4MWRmMCIsIm5iZiI6MTc0MTMzMzEyMC45Njg5OTk5LCJzdWIiOiI2N2NhYTI4MGRjYzljMDNmZjBjYjU4ODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jvjOD7K0It-DHOnDDjmWeGU3mnja-3qh1Ez36t6HwCk'
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options,
      signal
    )
      .then(res => res.json())
      .then(res => {
        setApiData(res.results || []);
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort(); // Cleanup fetch on unmount
  }, []);


  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {
    const element = cardsRef.current;
    element.addEventListener('wheel', handleWheel);

    return () => element.removeEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default TitleCards
