import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import cartContext from './context/cartContext'
import { useState } from 'react'


function App() {
  const [cart, setCart] = useState([])

  return (
    <>
      <cartContext.Provider value={{ cart, setCart }}>
        <div className="flex flex-col justify-between min-h-screen">
          <div>
            <Navbar />
            <Outlet />
          </div>
          <Footer />
        </div>
      </cartContext.Provider>
    </>
  )
}

export default App
