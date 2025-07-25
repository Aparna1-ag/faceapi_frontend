import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import Home from './Home'
import Login2 from './Login2'



const App = () => {
  return (
 <BrowserRouter >
<div className='p-8'>
<Routes>
 <Route path='/' element={ <Home />} />

  <Route path='/login' element={ <Login />} />
  <Route path='/login2' element={ <Login2 />} />

  <Route path='/signin' element={ <SignIn />} />

 </Routes>
</div>
 </BrowserRouter>
  )
}

export default App
