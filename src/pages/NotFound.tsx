import React from 'react'
import '../styles/not_found.css'
import { Link } from 'react-router-dom'

function NotFound() {

  return (
    <div className='not-found'>
        <h5>404</h5>
<div className="cloak__wrapper">
  <div className="cloak__container">
    <div className="cloak"></div>
  </div>
</div>
<div className="info">
  <h2>We can't find that page</h2>
  <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><Link to={'/'}>
  <span className="span-mother">
    <span>H</span>
    <span>o</span>
    <span>m</span>
    <span>e</span>
   
  </span>
  <span className="span-mother2">
    <span>H</span>
    <span>o</span>
    <span>m</span>
    <span>e</span>
   
  </span>
</Link>
</div>
    </div>
  )
}

export default NotFound