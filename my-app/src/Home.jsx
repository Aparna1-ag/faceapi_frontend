import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='p-5'>

        <h1 className='text-3xl'>Welcome User!</h1>

      <div className='mt-5'>
     <Link to="/login"> <button className="btn btn-info mx-5">Login</button></Link>
     <Link to="/signin">  <button className="btn btn-accent">Signin</button> </Link>
      </div>





      
    </div>
  )
}

export default Home
