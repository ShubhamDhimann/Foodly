import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import MyOrders from './components/MyOrders.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route path='' element={<Home />} />
        <Route path='/myorders' element={<MyOrders/>}></Route>
      </Route>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
