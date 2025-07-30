import React, { useEffect, useRef, useState } from 'react'
import "./titile.css"
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const Titile = ({title,category}) => {
  const[apiData,setApiData]=useState([])
  const cardRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0ZGQ5NDRlZjA3MzBiZmNiNzcxMTFmMWRhOGQwYyIsIm5iZiI6MTcyNjY0MTg1Ny42MDQ3ODQsInN1YiI6IjY2ZWE3NGY1ODJmZjg3M2Y3ZDFmMjI3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tb4_BOvdjCHTVhcoaouNdb7ROPMjb7iFfDYyDOtbOag'
    }
  };
  
  
const handlewheel =(event)=>{
  event.preventDefualt()
  cardRef.current.scrollLeft+=event.deltay
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  cardRef.current.addEventListener('wheel',handlewheel)},[]
)
  return (
    <div className='titile'> 
    <h2>{title?title:"Popular on Netflix"}</h2>
    <div className='card-list' ref={cardRef}>
      {apiData.map((card,index)=>{
        return <Link to={`/player/${card.id}`} className='card'  key={index}>
          <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </Link>
      })}
    </div>
      
    </div>
  )
}

export default Titile
