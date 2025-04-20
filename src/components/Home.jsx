import React from 'react'
import { useState } from 'react';
import FoodCard from './FoodCard';
import Carousal from './Carousal';
import searchContext from '../context/searchContext';

const Home = ({ imageSrc, name }) => {
  const [search, setSearch] = useState("")

  return (
      <searchContext.Provider value={{ search, setSearch }} >
        <div>
          <Carousal />

          <div className="cards mb-8">
            <FoodCard />
          </div>

        </div>
      </searchContext.Provider>
  )
}

export default Home
