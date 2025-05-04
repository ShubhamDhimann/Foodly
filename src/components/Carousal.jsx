import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useContext } from 'react';
import searchContext from '../context/searchContext';
import { NavLink } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';


const Carousal = () => {
    const { search, setSearch } = useContext(searchContext)
    const handleSearch = (e) => setSearch(e.target.value);
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setSlideNo((prev) => (prev === carousalImgLinks.length - 1 ? 0 : prev + 1))
            console.log("swiped left")
        },
        onSwipedRight: () => {
            setSlideNo((prev) => (prev === 0 ? carousalImgLinks.length - 1 : prev - 1))
            console.log("swiped right")
        }
    })

    const carousalImgLinks = [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=1932&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    ];

    const [slideNo, setSlideNo] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideNo((prev) => (prev === carousalImgLinks.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => setSlideNo((prev) => (prev === 0 ? carousalImgLinks.length - 1 : prev - 1));
    const nextSlide = () => setSlideNo((prev) => (prev === carousalImgLinks.length - 1 ? 0 : prev + 1));
    const navDotHandler = (index) => setSlideNo(index);

    return (
        <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden"
        {...handlers}>
            <div className="carousal w-full h-full flex transition-all duration-700" style={{ transform: `translateX(-${slideNo * 100}vw)` }}>
                {carousalImgLinks.map((link, index) => (
                    <div key={index} className="w-screen flex-shrink-0">
                        <img src={link} alt="Delicious food awaits you..." className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] object-cover" />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 text-xl sm:text-2xl cursor-pointer shadow-lg hover:bg-gray-800 hover:text-white p-2 bg-gray-200 rounded-full">
                <FaArrowLeft />
            </button>
            <button onClick={nextSlide} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-xl sm:text-2xl cursor-pointer shadow-lg hover:bg-gray-800 hover:text-white p-2 bg-gray-200 rounded-full">
                <FaArrowRight />
            </button>

            <div className="navDots absolute left-1/2 bottom-4 -translate-x-1/2 flex gap-2 sm:gap-3">
                {carousalImgLinks.map((_, index) => (
                    <div key={index} onClick={() => navDotHandler(index)} className="h-2 w-6 sm:w-10 rounded-full bg-gray-300 hover:bg-white cursor-pointer shadow"></div>
                ))}
            </div>

            {/* Search box */}
            <div className="absolute bottom-14 sm:bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-[550px]">
                <a onClick={(e) => {
                    e.preventDefault(); // Stop default anchor jump
                    const el = document.getElementById("searchbox");
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                    }
                }} className="flex items-center p-1.5 border border-white/50 bg-white/30 backdrop-blur-md rounded-full shadow-lg">
                    <input type="text" placeholder="Search..." id='searchbox' className="scroll-m-28 transition-all w-full bg-transparent p-2 sm:p-3 outline-none text-base sm:text-xl text-black placeholder-black"
                        value={search} onChange={handleSearch} />
                    <button className="bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-4 rounded-full hover:bg-gray-700 transition-all flex items-center justify-center">
                        <FaSearch size={18} className="sm:size-5" />
                    </button>
                </a>
            </div>
        </div>
    );
};  

export default Carousal;
