import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllMembers from './Components/AllMembers'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import ShowMember from './Components/ShowMember'
function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllMembers />} >

            </Route>
            <Route path="/member" element={<ShowMember />}></Route>
          </Routes>
          <Outlet />
        </BrowserRouter>
      </div>
    </>

  )
}

export default App
