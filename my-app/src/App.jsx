import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Login from './Login'
import Home from './Home'
import Login2 from './Login2'
import NewSignIn from './NewSignIn'
import NewLogIn from './NewLogIn'
import Dashboard from './Dashboard'



//tasks pending
//backend:  Do not allow registering same face. Send face already registered.
//frontend: detects one face only. When sees multiple faces, throws a warning or goes for most focussed person.
//frontend: detects face/watches for the descriptor araay to fill




const App = () => {
  return (
 <BrowserRouter >
<div className='p-8'>
<Routes>
 <Route path='/' element={ <Home />} />

  <Route path='/testing' element={ <Login />} />
  <Route path='/testing2' element={ <Login2 />} />

  <Route path='/testing2' element={ <SignIn />} />

  <Route path='/signin' element={ <NewSignIn />} />
  <Route path='/login' element={ <NewLogIn />} />
  <Route path='/dashboard' element={ <Dashboard />} />




 </Routes>
</div>
 </BrowserRouter>
  )
}

export default App
