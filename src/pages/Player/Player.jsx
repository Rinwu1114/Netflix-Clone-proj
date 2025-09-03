import React, { useEffect, useState } from 'react'
import './Player.css'
import backarrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate as nav , useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = nav();

  const [apiData, setapiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjM5YmIyMWUxNjQ4ZjE3MWJjN2YyYzMyMTQxOGRhNSIsIm5iZiI6MTc1NjcxMzU4Ni4yLCJzdWIiOiI2OGI1NTI3MjVmNTFhMzkzN2FiNGY3YTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s000LSoVFvtxwHQupEXFqVZxHu0t4D_1Dkyz4s3LzZI'
  }
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setapiData(res.results[0]))
  .catch(err => console.error(err));
}, [])

  return (
    <div className='player'>
      <img src={backarrow_icon} alt="" onClick={() => {navigate(-1)}} />
      <iframe 
      width = '90%'
      height= '90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer'
      frameborder="0"
      allowFullScreen></iframe>
      <div className="player__info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
